from fastapi import APIRouter, UploadFile, File, HTTPException
from schemas.evidence import EvidenceResponse
from services.csv_parser import parse_csv
from services.masking import mask_record
from services.timeline import build_timeline
from services.contradiction import detect_contradictions
import uuid
import os

router = APIRouter(prefix="/cases", tags=["Evidence"])

ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".pdf", ".txt", ".csv"}


@router.post("/{case_id}/evidence", response_model=EvidenceResponse)
async def upload_evidence(
    case_id: str,
    file: UploadFile = File(...)
):
    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    evidence_id = str(uuid.uuid4())
    file_content = await file.read()

    parsed_data = None

    if extension == ".csv":
        try:
            parsed_data = parse_csv(file_content)

            masked_records = [
                mask_record(record)
                for record in parsed_data["records"]
            ]

            parsed_data["records"] = masked_records
            parsed_data["timeline"] = build_timeline(masked_records)
            parsed_data["contradictions"] = detect_contradictions(masked_records)

        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Unable to process CSV file"
            )

    return {
        "id": evidence_id,
        "case_id": case_id,
        "filename": file.filename,
        "file_type": extension.replace(".", ""),
        "status": "processed" if parsed_data else "uploaded",
        "parsed_data": parsed_data
    }
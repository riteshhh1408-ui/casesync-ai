from fastapi import APIRouter
from schemas.verification import VerificationRequest, VerificationResponse

router = APIRouter(
    prefix="/cases",
    tags=["Verification"]
)


@router.post(
    "/{case_id}/evidence/{evidence_id}/verify",
    response_model=VerificationResponse
)
def verify_evidence(
    case_id: str,
    evidence_id: str,
    verification: VerificationRequest
):
    return {
        "evidence_id": evidence_id,
        "status": verification.status,
        "note": verification.note
    }
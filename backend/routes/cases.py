from fastapi import APIRouter
from schemas.case import CaseCreate, CaseResponse
import uuid

router = APIRouter(prefix="/cases", tags=["Cases"])


@router.post("/", response_model=CaseResponse)
def create_case(case: CaseCreate):
    return {
        "id": str(uuid.uuid4()),
        "title": case.title,
        "description": case.description,
        "status": "open"
    }


@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: str):
    return {
        "id": case_id,
        "title": "Sample Case",
        "description": "Sample incident",
        "status": "open"
    }
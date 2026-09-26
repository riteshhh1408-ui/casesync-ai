from pydantic import BaseModel
from typing import Literal


class VerificationRequest(BaseModel):
    status: Literal["verified", "needs_review", "missing"]
    note: str | None = None


class VerificationResponse(BaseModel):
    evidence_id: str
    status: str
    note: str | None = None
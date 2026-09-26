from pydantic import BaseModel
from typing import Optional, Any


class EvidenceResponse(BaseModel):
    id: str
    case_id: str
    filename: str
    file_type: str
    status: str
    parsed_data: Optional[Any] = None
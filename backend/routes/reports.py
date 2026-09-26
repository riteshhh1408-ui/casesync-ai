from fastapi import APIRouter, Response
from services.csv_report import generate_csv_report

router = APIRouter(
    prefix="/cases",
    tags=["Reports"]
)


@router.post("/{case_id}/report")
def generate_report(case_id: str):
    records = [
        {
            "date": "2026-09-25",
            "time": "10:45",
            "amount": 5000,
            "mobile": "98******10",
            "upi": "ab***@upi",
            "reference_no": "TXN****6451"
        },
        {
            "date": "2026-09-25",
            "time": "11:00",
            "amount": 2500,
            "mobile": "98******10",
            "upi": "ab***@upi",
            "reference_no": "TXN****6452"
        }
    ]

    contradictions = []

    csv_content = generate_csv_report(
        records,
        contradictions
    )

    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=case_report.csv"
        }
    )
import csv
from io import StringIO


def generate_csv_report(records, contradictions):
    output = StringIO()

    fieldnames = [
        "date",
        "time",
        "amount",
        "mobile",
        "upi",
        "reference_no",
        "status",
        "note"
    ]

    writer = csv.DictWriter(
        output,
        fieldnames=fieldnames
    )

    writer.writeheader()

    contradiction_timestamps = {
        item.get("timestamp")
        for item in contradictions
    }

    for record in records:
        timestamp = f"{record.get('date', '')} {record.get('time', '')}"

        if timestamp in contradiction_timestamps:
            status = "needs_review"
            note = "Potential inconsistency detected"
        else:
            status = "verified"
            note = ""

        writer.writerow({
            "date": record.get("date", ""),
            "time": record.get("time", ""),
            "amount": record.get("amount", ""),
            "mobile": record.get("mobile", ""),
            "upi": record.get("upi", ""),
            "reference_no": record.get("reference_no", ""),
            "status": status,
            "note": note
        })

    return output.getvalue()
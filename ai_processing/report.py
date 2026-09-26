import csv


def export_incident_csv(result, output_file="incident_report.csv"):
    """
    Export processed CaseSync AI events to a CSV incident report.
    """

    events = result.get("events", [])

    if not events:
        return output_file

    fieldnames = [
        "event_type",
        "date",
        "time",
        "amount",
        "mobile",
        "upi",
        "email",
        "url",
        "reference_no",
        "account_no",
        "message",
        "source",
        "confidence",
        "missing_fields",
        "flags"
    ]

    with open(
        output_file,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()

        for event in events:
            row = event.copy()

            # Convert nested/list values into CSV-safe strings
            row["confidence"] = str(row.get("confidence", {}))
            row["missing_fields"] = ", ".join(
                row.get("missing_fields", [])
            )
            row["flags"] = " | ".join(
                row.get("flags", [])
            )

            writer.writerow(row)

    return output_file
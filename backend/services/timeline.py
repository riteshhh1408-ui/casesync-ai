from datetime import datetime


def build_timeline(records):
    timeline = []

    for record in records:
        date_value = record.get("date", "")
        time_value = record.get("time", "")

        try:
            timestamp = datetime.strptime(
                f"{date_value} {time_value}",
                "%Y-%m-%d %H:%M"
            )
        except ValueError:
            timestamp = datetime.max

        timeline.append({
            "timestamp": timestamp,
            "date": date_value,
            "time": time_value,
            "amount": record.get("amount"),
            "mobile": record.get("mobile"),
            "upi": record.get("upi"),
            "reference_no": record.get("reference_no")
        })

    timeline.sort(key=lambda x: x["timestamp"])

    for event in timeline:
        event.pop("timestamp")

    return timeline
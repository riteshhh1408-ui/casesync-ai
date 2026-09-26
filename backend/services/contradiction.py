from collections import defaultdict


def detect_contradictions(records):
    contradictions = []

    amount_by_timestamp = defaultdict(list)

    for record in records:
        date = record.get("date", "")
        time = record.get("time", "")
        amount = record.get("amount")

        key = f"{date} {time}"

        if amount is not None:
            amount_by_timestamp[key].append(amount)

    for timestamp, amounts in amount_by_timestamp.items():
        unique_amounts = set(amounts)

        if len(unique_amounts) > 1:
            contradictions.append({
                "type": "transaction_amount",
                "timestamp": timestamp,
                "message": "Potential inconsistency detected: different transaction amounts are recorded for the same timestamp.",
                "status": "needs_review"
            })

    return contradictions
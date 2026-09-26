def detect_contradictions(events):
    """
    Detect simple inconsistencies between evidence records.

    This function does NOT determine fraud or authenticity.
    It only flags information that may require human review.
    """

    flags = []

    for i in range(len(events)):
        for j in range(i + 1, len(events)):

            first = events[i]
            second = events[j]

            # Same reference number but different amounts
            if (
                first.get("reference_no")
                and second.get("reference_no")
                and first.get("reference_no") == second.get("reference_no")
                and first.get("amount") != second.get("amount")
            ):
                flags.append({
                    "type": "potential_inconsistency",
                    "message": "Potential inconsistency detected: same reference number with different amounts.",
                    "records": [i, j]
                })

            # Same reference number but different dates
            if (
                first.get("reference_no")
                and second.get("reference_no")
                and first.get("reference_no") == second.get("reference_no")
                and first.get("date") != second.get("date")
            ):
                flags.append({
                    "type": "potential_inconsistency",
                    "message": "Potential inconsistency detected: same reference number with different dates.",
                    "records": [i, j]
                })

    return flags
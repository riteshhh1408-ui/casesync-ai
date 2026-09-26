def create_event(
    date=None,
    time=None,
    event_type=None,
    amount=None,
    mobile=None,
    upi=None,
    email=None,
    url=None,
    reference_no=None,
    account_no=None,
    message=None,
    source=None
):
    return {
        "event_type": event_type,
        "date": date,
        "time": time,
        "amount": amount,
        "mobile": mobile,
        "upi": upi,
        "email": email,
        "url": url,
        "reference_no": reference_no,
        "account_no": account_no,
        "message": message,
        "source": source,
        "confidence": {},
        "missing_fields": [],
        "flags": []
    }
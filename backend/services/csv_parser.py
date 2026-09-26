import pandas as pd
from io import BytesIO


def parse_csv(file_content: bytes):
    df = pd.read_csv(BytesIO(file_content))

    return {
        "columns": df.columns.tolist(),
        "row_count": len(df),
        "records": df.fillna("").to_dict(orient="records")
    }
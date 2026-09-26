from fastapi import FastAPI

from routes.cases import router as cases_router
from routes.evidence import router as evidence_router

from routes.verification import router as verification_router
from routes.reports import router as reports_router

app = FastAPI(
    title="CaseSync AI API",
    version="0.1.0"
)

app.include_router(cases_router)
app.include_router(evidence_router)
app.include_router(verification_router)
app.include_router(reports_router)


@app.get("/")
def root():
    return {
        "message": "CaseSync AI Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }
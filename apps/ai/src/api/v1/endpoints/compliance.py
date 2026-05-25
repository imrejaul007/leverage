"""
Compliance API endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, Header
from models.schemas import ComplianceAdvice, ClassificationResult, RiskAssessment, EntityInfo, ComplianceLevel, FraudType, DocumentType

router = APIRouter()

COUNTRY_NAMES = {"US": "United States", "CN": "China", "DE": "Germany", "JP": "Japan", "UK": "United Kingdom", "IN": "India", "KR": "South Korea", "VN": "Vietnam", "MX": "Mexico", "CA": "Canada", "AU": "Australia", "AE": "UAE", "SG": "Singapore", "MY": "Malaysia", "TH": "Thailand", "ID": "Indonesia", "BR": "Brazil"}
SANCTIONED = {"IR": "Iran", "KP": "North Korea", "SY": "Syria", "CU": "Cuba", "VE": "Venezuela", "RU": "Russia", "BY": "Belarus"}
HS_PREFIXES = {"84": "Machinery", "85": "Electronics", "87": "Vehicles", "90": "Optical/Medical", "29": "Chemicals", "30": "Pharmaceuticals", "61": "Apparel Knit", "62": "Apparel Woven", "64": "Footwear", "94": "Furniture", "72": "Iron/Steel"}

def classify_hs(description: str):
    desc_lower = description.lower()
    for prefix, category in HS_PREFIXES.items():
        keywords = {"84": ["machine", "engine", "motor"], "85": ["electrical", "electronic", "circuit"], "87": ["vehicle", "car", "truck"], "90": ["optical", "camera", "medical"], "30": ["pharmaceutical", "medicine"]}
        if prefix in keywords:
            for kw in keywords[prefix]:
                if kw in desc_lower:
                    return f"{prefix}.xx.xxxx", 0.85, [{"code": f"{prefix}.10.0000", "description": f"{category}"}]
    return "9999.99.9999", 0.50, []

def check_compliance(product_description: str, origin_country: str, destination_country: str):
    origin = COUNTRY_NAMES.get(origin_country.upper(), origin_country)
    destination = COUNTRY_NAMES.get(destination_country.upper(), destination_country)
    warnings, requirements, documents_needed, actions = [], [], [DocumentType.COMMERCIAL_INVOICE, DocumentType.PACKING_LIST], []
    risk_level = ComplianceLevel.LOW
    is_compliant = True
    if origin_country.upper() in SANCTIONED or destination_country.upper() in SANCTIONED:
        is_compliant = False
        risk_level = ComplianceLevel.CRITICAL
        warnings.append("Trade with sanctioned country")
        documents_needed.extend([DocumentType.EXPORT_LICENSE, DocumentType.CUSTOMS_DECLARATION])
    desc_lower = product_description.lower()
    if any(kw in desc_lower for kw in ["semiconductor", "chip"]):
        if origin_country.upper() == "CN" or destination_country.upper() == "CN":
            risk_level = ComplianceLevel.HIGH
            warnings.append("Semiconductor trade may require export control verification")
    return ComplianceAdvice(is_compliant=is_compliant, risk_level=risk_level, summary=f"Trade from {origin} to {destination}", requirements=requirements, recommended_actions=actions, documents_needed=list(set(documents_needed)), warnings=warnings, sources=["CBP", "EU Customs", "WTO"])

def assess_entity_risk(entity: EntityInfo):
    red_flags, risk_factors, flagged_types = [], [], []
    country = entity.country.upper() if entity.country else None
    risk_score = 0.0
    if country in SANCTIONED:
        red_flags.append(f"Entity from sanctioned country: {SANCTIONED.get(country, country)}")
        risk_factors.append({"factor": "Sanctioned Country", "weight": 0.5, "detail": "High-risk jurisdiction"})
        flagged_types.append(FraudType.SANCTIONS_EVASION)
        risk_score += 0.5
    if not entity.registration_number:
        red_flags.append("No registration number provided")
        risk_factors.append({"factor": "Missing Registration", "weight": 0.15, "detail": "Unable to verify entity"})
        risk_score += 0.15
    risk_level = ComplianceLevel.HIGH if risk_score >= 0.4 else ComplianceLevel.MEDIUM if risk_score >= 0.2 else ComplianceLevel.LOW
    return RiskAssessment(overall_risk_score=min(risk_score, 1.0), risk_level=risk_level, risk_factors=risk_factors, red_flags=red_flags, recommendations=["Verify entity registration", "Check sanctions lists"], requires_review=risk_score >= 0.15, flagged_for=flagged_types)

@router.post("/advice", response_model=ComplianceAdvice)
async def compliance_advice(product_description: str, origin_country: str, destination_country: str):
    if not product_description or len(product_description) < 3:
        raise HTTPException(status_code=400, detail="Product description too short")
    return check_compliance(product_description, origin_country, destination_country)

@router.post("/classify", response_model=ClassificationResult)
async def classify_product(description: str):
    if not description or len(description) < 3:
        raise HTTPException(status_code=400, detail="Description too short")
    hs_code, confidence, alternatives = classify_hs(description)
    return ClassificationResult(predicted_hs_code=hs_code, confidence=confidence, description=description, alternative_codes=alternatives, category=HS_PREFIXES.get(hs_code.split(".")[0], "Other goods"), restrictions=[])

@router.post("/risk-assess", response_model=RiskAssessment)
async def risk_assessment(entity: EntityInfo):
    if not entity.entity_id:
        raise HTTPException(status_code=400, detail="Entity ID required")
    return assess_entity_risk(entity)

@router.get("/countries")
async def list_countries():
    return {"countries": [{"code": k, "name": v} for k, v in COUNTRY_NAMES.items()], "sanctioned": [{"code": k, "name": v} for k, v in SANCTIONED.items()]}

@router.get("/hs-categories")
async def list_hs_categories():
    return {"categories": [{"prefix": k, "description": v} for k, v in HS_PREFIXES.items()]}

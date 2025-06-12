// src/services/api/api-groups.ts
import { ApiEndpoints } from "./apiBuilder"

export const QuestionnaireEndpoints = ApiEndpoints("http://localhost:5003").questionnaire
export const ProductEndpoints = ApiEndpoints("http://localhost:5002").product
export const PaymentEndpoints = ApiEndpoints("http://localhost:5002").payment
export const AuthEndpoints = ApiEndpoints("http://localhost:5001").auth
export const UserEndpoints = ApiEndpoints("http://localhost:5001").user
export const ReportEndpoints = ApiEndpoints("http://localhost:6001").reports

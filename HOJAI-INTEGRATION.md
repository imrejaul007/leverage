# HOJAI AI Integration Guide for LEVERAGE

**Status:** Planned
**Last Updated:** June 16, 2026

---

## Overview

LEVERAGE is integrated with HOJAI AI for business intelligence and automation services.

---

## Services Architecture

| LEVERAGE Service | Port | Description |
|---------|------|-------------|
| **leverge-intelligence** | 4761 | Business analytics, insights, metrics, reports |
| **leverge-memory** | 4762 | AI memory, vector storage, context management |
| **leverge-twin** | 4763 | Digital twin management and synchronization |
| **leverge-agents** | 4764 | AI agent orchestration and task execution |
| **leverge-copilot** | 4765 | Business AI assistant and automation |

---

## Technology Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis (ioredis)
- **Security:** JWT, Helmet, CORS, Rate Limiting
- **Logging:** Winston

---

## Integration with HOJAI AI

LEVERAGE connects to the following HOJAI AI services:

| HOJAI Service | Port | Purpose |
|-------------|------|---------|
| **RABTUL Auth** | 4002 | Authentication |
| **RABTUL Notification** | - | Notifications |
| **TwinOS Hub** | 4705 | Digital twin registry |
| **AgentOS** | 4550 | Agent marketplace |
| **SUTAR OS** | 4140+ | Autonomous operations |

---

## API Endpoints

### Intelligence Service (4761)
```
GET  /api/insights           - Get business insights
GET  /api/analytics/dashboard - Dashboard analytics
GET  /api/metrics/business   - Business metrics
POST /api/reports/generate    - Generate reports
```

### Memory Service (4762)
```
POST /api/memory             - Store memory
GET  /api/memory             - Get memories
POST /api/vectors/search     - Vector similarity search
POST /api/context/build      - Build AI context
```

### Twin Service (4763)
```
POST /api/twins              - Create digital twin
GET  /api/twins              - List twins
PATCH /api/twins/:twinId/state - Update twin state
POST /api/sync/:twinId       - Sync twin data
```

### Agents Service (4764)
```
POST /api/agents             - Create agent
POST /api/execution/execute  - Execute task
POST /api/workflows/:workflowId/execute - Execute workflow
```

### Copilot Service (4765)
```
POST /api/chat              - Create conversation
POST /api/chat/:id/messages  - Send message
POST /api/assistant/analyze  - Analyze data
POST /api/templates/:id/use  - Use template
```

---

## Environment Variables

```env
PORT=4761-4765
NODE_ENV=development|production
MONGODB_URI=mongodb://localhost:27017/leverge_[service]
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
RABTUL_AUTH_URL=http://localhost:4002
CORS_ORIGIN=*
LOG_LEVEL=info
```

---

## Quick Start

```bash
# Install dependencies for all services
cd leverge-intelligence && npm install
cd leverge-memory && npm install
cd leverge-twin && npm install
cd leverge-agents && npm install
cd leverge-copilot && npm install

# Start services
cd leverge-intelligence && npm start
cd leverge-memory && npm start
cd leverge-twin && npm start
cd leverge-agents && npm start
cd leverge-copilot && npm start
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    LEVERAGE Platform                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Intelligence │  │   Memory     │  │    Twin      │        │
│  │   (4761)    │  │   (4762)    │  │   (4763)    │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                │                │                  │
│  ┌──────┴────────────────┴────────────────┴───────┐        │
│  │              RABTUL Services                    │        │
│  │         (Auth 4002 | Wallet 4004)              │        │
│  └──────────────────────┬─────────────────────────┘        │
│                         │                                   │
│  ┌──────────────────────┴─────────────────────────┐       │
│  │              HOJAI AI Infrastructure            │       │
│  │         (TwinOS Hub | AgentOS | SUTAR OS)        │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## AI Features to Implement

### Priority 1: Core AI
- [ ] AI Copilot Chat UI (leverge-copilot)
- [ ] Business Analytics Dashboard (leverge-intelligence)
- [ ] Document Intelligence

### Priority 2: Trade AI Agents
- [ ] Invoice Agent - Auto-generate invoices
- [ ] BL Agent - Bill of Lading assistance
- [ ] COO Agent - Certificate of Origin
- [ ] Compliance Agent - HS code lookup
- [ ] Freight Agent - Shipment tracking

### Priority 3: Advanced AI
- [ ] SUTAR OS Integration - Autonomous procurement
- [ ] Digital Twin Sync - Real-time business state
- [ ] Vector Memory - AI context from past interactions

---

## Support

For integration support, contact the HOJAI AI team through your designated account manager.

---

*Last Updated: June 16, 2026*

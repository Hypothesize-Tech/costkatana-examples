/**
 * Cost Katana Workflows: Next.js Integration
 * 
 * Location: app/api/workflows/execute/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE = 'https://cost-katana-backend.store/api';
const API_KEY = process.env.COST_KATANA_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId, variables } = body;
    
    // Execute workflow
    const response = await axios.post(
      `${API_BASE}/workflows/templates/${templateId}/execute`,
      { variables },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return NextResponse.json({
      success: true,
      execution: response.data.data
    });
    
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data || error.message
      },
      { status: 500 }
    );
  }
}

// Location: app/api/workflows/[executionId]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { executionId: string } }
) {
  try {
    const response = await axios.get(
      `${API_BASE}/workflows/executions/${params.executionId}`,
      {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      }
    );
    
    return NextResponse.json({
      success: true,
      execution: response.data.data
    });
    
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data || error.message
      },
      { status: 500 }
    );
  }
}

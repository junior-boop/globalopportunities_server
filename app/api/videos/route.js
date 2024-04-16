import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'

/**
 * @param {NextRequest} request 
 * @returns 
 */
export const POST = async (request) => {
  const data = await request.formData();

  
  
  const server = await fetch(process.env.URL + '/videos', {
    method : 'POST',
    body : data
  })
  return new Response(await server.json())
};

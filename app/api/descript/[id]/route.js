import { NextRequest, NextResponse } from "next/server";
export const runtime = 'edge'

/**
 * @param {NextRequest} request 
 * @returns {NextResponse}
 */
export const PUT = async (request) => {
  const name = request.nextUrl.pathname.split('/').at(-1)
  const  mettingId = name.split('.')[0]
  
  const data = await request.formData();

  const server = await fetch(`${process.env.URL}/metting/${mettingId}/descript`, {
    method : 'PUT',
    body : data
  })
  return new Response(await server.json())
  // return new Response('je suis la')
};
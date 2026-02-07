import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  
  try {
    // Envoyer les données à l'API Laravel
    const laravelResponse = await fetch(`${process.env.LARAVEL_API}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${body.token}`
      },
      body: JSON.stringify({
        property_id: body.property_id,
        start_date: body.start_date,
        end_date: body.end_date,
        guests: body.guests,
        payment_method: body.payment_method,
        special_requests: body.special_requests,
        total_amount: body.total_amount
      })
    });

    const data = await laravelResponse.json();
    
    if (!laravelResponse.ok) {
      throw new Error(data.message || 'Erreur lors de la réservation');
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    const laravelResponse = await fetch(`${process.env.LARAVEL_API}/api/reservations/${id}`, {
      headers: {
        'Authorization': `Bearer ${request.headers.get('authorization')?.split(' ')[1]}`
      }
    });

    const data = await laravelResponse.json();
    
    if (!laravelResponse.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération de la réservation');
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
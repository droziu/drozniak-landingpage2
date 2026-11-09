import type { Metadata } from 'next';
import { ManageBooking } from '../../ManageBooking';
import '../../umow.css';

export const metadata: Metadata = {
  title: { absolute: 'Twoja rezerwacja | Stanisław Drożniak' },
  robots: { index: false, follow: false },
};

export default async function ManageBookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <main className="bk bk-manage site-wrap">
      <ManageBooking token={token} />
    </main>
  );
}

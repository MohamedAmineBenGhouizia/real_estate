import React from 'react';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Button from '../common/Button';

const ReservationList = ({ reservations }) => {
    if (!reservations || reservations.length === 0) {
        return <div className="text-center py-10 text-secondary-500">No reservations found.</div>;
    }

    return (
        <div className="space-y-4">
            {reservations.map((reservation) => (
                <Card key={reservation.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-secondary-900">{reservation.Property?.title || 'Unknown Property'}</h3>
                        <p className="text-secondary-500 text-sm">
                            {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant={
                            reservation.status === 'confirmed' ? 'success' :
                                reservation.status === 'cancelled' ? 'error' : 'warning'
                        }>
                            {reservation.status}
                        </Badge>
                        {reservation.status === 'confirmed' && (
                            <Button size="sm" variant="outline">View Invoice</Button>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ReservationList;

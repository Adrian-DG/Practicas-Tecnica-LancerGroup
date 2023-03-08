export interface IUser {
	userId: number | null;
	customerName: string;
	profilePic: string;
	userEmail: string;
	phoneNumber: string;
	ReservationHistory: any[];
	FutureReservations: any[];
	FavoritesServices: any[];
	PayMethods: any[];
}

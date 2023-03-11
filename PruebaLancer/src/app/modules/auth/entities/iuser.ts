export interface IUser {
	userId: number | null;
	custumerName: string;
	profilePic: string;
	status: string;
	userEmail: string;
	phoneNumber: string;
	ReservationHistory: any[];
	FutureReservations: any[];
	FavoritesServices: any[];
	PayMethods: any[];
}

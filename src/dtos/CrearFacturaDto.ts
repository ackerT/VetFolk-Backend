export class CreateFacturaDto {
    readonly idVenta: number;
    readonly numeroFactura: string;
    readonly fecha: Date; // Cambiado a string para que coincida con la entidad
    readonly subtotal: string; // Cambiado a string para que coincida con la entidad
    readonly isv: string; // Cambiado a string para que coincida con la entidad
    readonly total: string; // Cambiado a string para que coincida con la entidad
}

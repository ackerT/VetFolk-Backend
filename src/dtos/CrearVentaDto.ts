export class CreateVentaDto {
    readonly idCliente: number;
    readonly serieFactura: string;
    readonly fecha: Date; // Cambiado a string para que coincida con la entidad
    readonly total: string; // Cambiado a string para que coincida con la entidad
    readonly productos: {
        idProducto: number;
        cantidad: number;
        precioUnitario: string; // Cambiado a string para que coincida con la entidad
    }[];
}

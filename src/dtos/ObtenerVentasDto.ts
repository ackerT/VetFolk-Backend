export class GetVentasResponseDto {
    idVenta: number;
    fecha: Date;
    total: string;
    productos: {
        idProducto: number;
        nombreProducto: string;  
        cantidad: number;
        precioUnitario: string;
    }[];
}

// src/productos/dto/update-stock.dto.ts
import { IsInt, IsPositive } from 'class-validator';
export class UpdateStockDto {
    @IsInt()
    idProducto: number;
  
    @IsInt()
    @IsPositive()
    cantidad: number;
  }
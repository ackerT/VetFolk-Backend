import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { PersonaModule } from './personas/personas.module';
import { ProductosModule } from './productos/productos.module';
import { RoleModule } from './roles/roles.module';
import { ServiciosModule } from './servicios/servicios.module';
import { UsuarioModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './entities/Categorias';
import { Citas } from './entities/Citas';
import { Consultas } from './entities/Consultas';
import { Departamentos } from './entities/Departamentos';
import { Direcciones } from './entities/Direcciones';
import { Especies } from './entities/Especies';
import { Estados } from './entities/Estados';
import { Expedientes } from './entities/Expedientes';
import { Generos } from './entities/Generos';
import { Mascotas } from './entities/Mascotas';
import { Municipios } from './entities/Municipios';
import { Personal } from './entities/Personal';
import { Personas } from './entities/Personas';
import { Productos } from './entities/Productos';
import { Razas } from './entities/Razas';
import { Registrosdesparasitaciones } from './entities/Registrosdesparasitaciones';
import { Registrosvacunas } from './entities/Registrosvacunas';
import { Roles } from './entities/Roles';
import { Servicios } from './entities/Servicios';
import { Tiposdesparasitantes } from './entities/Tiposdesparasitantes';
import { Tiposvacunas } from './entities/Tiposvacunas';
import { Usuarios } from './entities/Usuarios';
import { Ventas } from './entities/Ventas';
import { Ventasproductos } from './entities/Ventasproductos';
import { AwsS3Service } from './aws-s3/aws-s3.service';
import { Facturas } from './entities/Facturas';
import { VentasModule } from './ventas/ventas.module';
import { ConsultasModule } from './consultas/consultas.module';
import { CitasModule } from './citas/citas.module';
import { EstadosModule } from './estados/estados.module';
import { PersonalModule } from './personal/personal.module';
import { NotificacionesModule } from './notificacion/notificacion.module';
import { Notificacion } from './entities/Notificacion';
import { EspeciesModule } from './especies/especies.module';


@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'vetfolkbd',
    entities: [Categorias, Citas, Consultas, Departamentos, Direcciones, Especies, Estados, Expedientes, Generos, Mascotas, Municipios,
      Personal, Personas, Productos, Razas, Registrosdesparasitaciones, Registrosvacunas, Roles, Servicios, Tiposdesparasitantes, Tiposvacunas,
      Usuarios, Ventas, Ventasproductos, Facturas, Notificacion
    ],
    synchronize: false,
}),
    AuthModule, AwsS3Module, CategoriasModule, ExpedientesModule, MascotasModule, PersonaModule, ProductosModule, 
    RoleModule, ServiciosModule, UsuarioModule ,ConfigModule.forRoot({ isGlobal: true }), VentasModule, ConsultasModule, CitasModule, EstadosModule, PersonalModule, NotificacionesModule, EspeciesModule],
  controllers: [AppController],
  providers: [AppService, AwsS3Service],
})
export class AppModule {}
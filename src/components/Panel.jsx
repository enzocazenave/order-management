import { useState } from 'react';
import Swal from 'sweetalert2';

export const Panel = () => {

    const [view, setView] = useState("pedidos");

    const onCompleteOrder = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No puedes revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Completar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Completado!',
                'El pedido se envió a la lista de pedidos completados',
                'success'
              )
            }
        })
    }

    const onDeleteOrder = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No puedes revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Borrado!',
                'El pedido se eliminó',
                'success'
              )
            }
        })
    }

    return (
        <>
            <header className="header-container">
                <button id={ (view == 'pedidos') ? 'button-selected' : '' } onClick={ () => setView('pedidos') } className="header-container-button">
                    Pedidos
                </button>
                <button id={ (view == 'completados') ? 'button-selected' : '' } onClick={ () => setView('completados') } className="header-container-button">
                    Pedidos completados
                </button>
                <button id={ (view == 'configuracion') ? 'button-selected' : '' } onClick={ () => setView('configuracion') } className="header-container-button">
                    Configuración
                </button>
            </header>
            <hr />
            {
                (view == 'pedidos') &&
                    <div className="p-container__pedidos animate__animated animate__fadeIn">
                        <table className="table-pedidos">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    <th>Fecha de pedido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button onClick={ onCompleteOrder } title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button onClick={ onDeleteOrder } title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>  
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                    <td data-label="Cantidad">15</td>
                                    <td data-label="Total">$ 2.250</td>
                                    <td data-label="Fecha de pedido">24/08/2022</td>
                                    <td data-label="Acciones">
                                        <button title="Completar pedido" className="table-pedidos-action">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button title="Eliminar pedido" className="table-pedidos-action button-red">
                                            <i className="fa fa-close"></i> 
                                        </button>
                                        <button title="Editar pedido" className="table-pedidos-action button-blue">
                                            <i className="fa fa-pencil"></i> 
                                        </button>
                                        <button title="Ver factura" className="table-pedidos-action button-pink">
                                            <i className="fas fa-file-alt"></i> 
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="buttons-container">
                            <button disabled><i className="fas fa-arrow-alt-circle-left"></i></button>
                            <button><i className="fas fa-arrow-alt-circle-right"></i></button>
                            <p>Pagina 1</p>
                        </div>
                    </div>
            }
            {
                (view == 'completados') &&
                <div className="p-container__pedidos animate__animated animate__fadeIn">
                    <table className="table-pedidos">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Fecha de pedido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                <td data-label="Cantidad">15</td>
                                <td data-label="Total">$ 2.250</td>
                                <td data-label="Fecha de pedido">24/08/2022</td>
                                <td data-label="Acciones">
                                    <button title="Ver factura" className="table-pedidos-action button-pink">
                                        <i className="fas fa-file-alt"></i> 
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                <td data-label="Cantidad">15</td>
                                <td data-label="Total">$ 2.250</td>
                                <td data-label="Fecha de pedido">24/08/2022</td>
                                <td data-label="Acciones">
                                    <button title="Ver factura" className="table-pedidos-action button-pink">
                                        <i className="fas fa-file-alt"></i> 
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                <td data-label="Cantidad">15</td>
                                <td data-label="Total">$ 2.250</td>
                                <td data-label="Fecha de pedido">24/08/2022</td>
                                <td data-label="Acciones">
                                    <button title="Ver factura" className="table-pedidos-action button-pink">
                                        <i className="fas fa-file-alt"></i> 
                                    </button>
                                </td>
                            </tr>  
                            <tr>
                                <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                <td data-label="Cantidad">15</td>
                                <td data-label="Total">$ 2.250</td>
                                <td data-label="Fecha de pedido">24/08/2022</td>
                                <td data-label="Acciones">
                                    <button title="Ver factura" className="table-pedidos-action button-pink">
                                        <i className="fas fa-file-alt"></i> 
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Cliente">Enzo Cazenave <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                <td data-label="Cantidad">15</td>
                                <td data-label="Total">$ 2.250</td>
                                <td data-label="Fecha de pedido">24/08/2022</td>
                                <td data-label="Acciones">
                                    <button title="Ver factura" className="table-pedidos-action button-pink">
                                        <i className="fas fa-file-alt"></i> 
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttons-container">
                        <button disabled><i className="fas fa-arrow-alt-circle-left"></i></button>
                        <button><i className="fas fa-arrow-alt-circle-right"></i></button>
                        <p>Pagina 1</p>
                    </div>
                </div>
            }
            {
                (view == 'configuracion') &&
                    <div className="p-container__pedidos animate__animated animate__fadeIn">
                        <div className="config-container">
                            <p>Precio de paquete</p>
                            <form>
                                $<input className="config-input" type="number" placeholder='150' />
                                <button className="table-pedidos-action button-blue" type="submit"><i className="fas fa-save"></i></button>
                            </form>
                        </div>
                        <div className="config-container">
                            <p>Precio de álbum</p>
                            <form>
                                $<input className="config-input" type="number" placeholder='850' />
                                <button className="table-pedidos-action button-blue" type="submit"><i className="fas fa-save"></i></button>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

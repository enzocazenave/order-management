import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { createNewOrder } from '../store/thunks';
import { getAllOrders } from '../helpers/getAllOrders';
import { getPrices } from '../helpers/getPrices';

export const Panel = () => {

    const [view, setView] = useState("pedidos");
    const dispatch = useDispatch();
    
    const [pedidos, setPedidos] = useState([]);
    const [pedidosCompletados, setPedidosCompletados] = useState([]);
    const [prices, setPrices] = useState([])

    useEffect(() => {
        if (view == 'pedidos') {
            getAllOrders().then((orders) => {
                const result = [];
            
                for (const order of orders) {
                    if (order.completed == false) result.push(order);
                }
            
                if (result.length > 0) setPedidos(result);
            })
        } else if (view == 'completados') {
            getAllOrders().then((orders) => {
                const result = [];
            
                for (const order of orders) {
                    if (order.completed == true) result.push(order);
                }
            
                if (result.length > 0) setPedidosCompletados(result);
            })
        } else if (view == 'configuracion') {
            getPrices().then(prices => setPrices(prices))
        }
    }, [view])
    
    const onCompleteOrder = (id) => {
        console.log(id);

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

    const onDeleteOrder = (id) => {
        console.log(id);
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No puedes revertir esto",
            icon: 'question',
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

    const onEditOrder = (id) => {
        console.log(id)
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
                <button onClick={() => dispatch(createNewOrder())} className="header-container-button">Agregar pedido</button>
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
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidos.map(pedido => (
                                        <tr key={ pedido.id }>
                                            <td data-label="Cliente">{pedido.name}<button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                            <td data-label="Cantidad">{ pedido.qtty }</td>
                                            <td data-label="Total">$ { pedido.total }</td>
                                            <td data-label="Fecha de pedido">{ pedido.date }</td>
                                            <td data-label="Estado">En proceso</td>
                                            <td data-label="Acciones">
                                                <button onClick={ () => onCompleteOrder(pedido.id) } title="Completar pedido" className="table-pedidos-action">
                                                    <i className="fa fa-check"></i>
                                                </button>
                                                <button onClick={ () => onDeleteOrder(pedido.id) } title="Eliminar pedido" className="table-pedidos-action button-red">
                                                    <i className="fa fa-close"></i> 
                                                </button>
                                                <button onClick={ () => onEditOrder(pedido.id) } title="Editar pedido" className="table-pedidos-action button-blue">
                                                    <i className="fa fa-pencil"></i> 
                                                </button>
                                                <button title="Ver factura" className="table-pedidos-action button-pink">
                                                    <i className="fas fa-file-alt"></i> 
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {
                            (pedidos.length > 10) &&
                                <div className="buttons-container">
                                    <button disabled><i className="fas fa-arrow-alt-circle-left"></i></button>
                                    <button><i className="fas fa-arrow-alt-circle-right"></i></button>
                                    <p>Pagina 1</p>
                                </div>
                        }
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
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pedidosCompletados.map(pedido => (
                                    <tr key={pedido.id}>
                                        <td data-label="Cliente">{pedido.name} <button className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
                                        <td data-label="Cantidad">{pedido.qtty}</td>
                                        <td data-label="Total">$ {pedido.total}</td>
                                        <td data-label="Fecha de pedido">{ pedido.date }</td>
                                        <td data-label="Estado">Completado</td>
                                        <td data-label="Acciones">
                                            <button title="Ver factura" className="table-pedidos-action button-pink">
                                                <i className="fas fa-file-alt"></i> 
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                    {
                        (pedidosCompletados.length > 10) &&
                            <div className="buttons-container">
                                <button disabled><i className="fas fa-arrow-alt-circle-left"></i></button>
                                <button><i className="fas fa-arrow-alt-circle-right"></i></button>
                                <p>Pagina 1</p>
                            </div>
                    }
                        
                </div>
            }
            {
                (view == 'configuracion') &&
                    <div className="p-container__pedidos animate__animated animate__fadeIn">
                        <div className="config-container">
                            <p>Precio de paquete</p>
                            <form>
                                $<input className="config-input" type="number" placeholder={ prices[1] } />
                                <button className="table-pedidos-action button-blue" type="submit"><i className="fas fa-save"></i></button>
                            </form>
                        </div>
                        <div className="config-container">
                            <p>Precio de álbum</p>
                            <form>
                                $<input className="config-input" type="number" placeholder={ prices[0] } />
                                <button className="table-pedidos-action button-blue" type="submit"><i className="fas fa-save"></i></button>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

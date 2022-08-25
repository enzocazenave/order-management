import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { completeOrder, createNewOrder, deleteOrder, updatePrice } from '../store/thunks';
import { getAllOrders } from '../helpers/getAllOrders';
import { getPrices } from '../helpers/getPrices';
import { useForm } from '../hooks/useForm';
import { login } from '../store/appSlice';

const initialForm1 = {
    package_price: 0
}

const initialForm2 = {
    album_price: 0
}

export const Panel = () => {

    const [view, setView] = useState("pedidos");
    const dispatch = useDispatch();
    const { price_package, price_album } = useSelector(state => state.app);
    const [pedidos, setPedidos] = useState([]);
    const [pedidosCompletados, setPedidosCompletados] = useState([]);
    const [prices, setPrices] = useState([]);
    const { package_price, onInputChange } = useForm(initialForm1);
    const { album_price, onInputChange: onChangeInput } = useForm(initialForm2);

    const getOrders = () => {
        getAllOrders().then((orders) => {
            const result = [];
        
            for (const order of orders) {
                if (order.completed == false) result.push(order);
            }
        
            if (result.length > 0) return setPedidos(result);

            setPedidos([]);

        });
    }

    const getPricesNow = () => {
        getPrices().then(prices => {
            setPrices(prices);
            dispatch(login(prices));

        });
    }

    useEffect(() => {
        if (view == 'pedidos') {
            getAllOrders().then((orders) => {
                const result = [];
            
                for (const order of orders) {
                    if (order.completed == false) result.push(order);
                }
            
                if (result.length > 0) setPedidos(result);
            });
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
              dispatch(completeOrder(id));
              getOrders();
              Swal.fire(
                'Completado!',
                'El pedido se envió a la lista de pedidos completados',
                'success'
              )
            }
        })
    }

    const onDeleteOrder = (id) => {
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
                dispatch(deleteOrder(id));
                Swal.fire(
                    'Borrado!',
                    'El pedido se eliminó',
                    'success'
                )
                getOrders();
            }
        });
    }

    const onAddOrder = async() => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar un nuevo pedido',
            html:
              '<input placeholder="Nombre del cliente" id="name-input1" type="text" class="swal2-input">' +
              '<input placeholder="Información del cliente" id="info-input2" type="text" class="swal2-input">' +
              '<input id="type-input3" type="number" placeholder="1: Paquetes | 2: Album" class="swal2-input input-add">' +
              '<input placeholder="Cantidad" id="qtty-input4" type="number" class="swal2-input">',
            focusConfirm: false,
            confirmButtonText: 'Agregar pedido',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return [
                document.getElementById('name-input1').value,
                document.getElementById('info-input2').value,
                document.getElementById('type-input3').value,
                document.getElementById('qtty-input4').value
              ]
            }
        })
          
        if (formValues) {
            if (formValues[0].length > 0 && formValues[1].length > 0 && formValues[2].length > 0 && formValues[3].length > 0) {
                dispatch(createNewOrder({
                    name: formValues[0],
                    info: formValues[1],
                    type: (formValues[2] == 2) ? 'album' : 'package',
                    price: (formValues[2] == 2) ? price_album : price_package,
                    qtty: formValues[3]
                }));

                getOrders();

                Swal.fire(
                    'Agregado!',
                    'El pedido se agregó a la lista',
                    'success'
                )
            }
        }
    }

    const onInfoClick = (info) => {
        Swal.fire(
            'Información del cliente',
            info,
            'info'
          )
    }

    const savePrice = (event, type) => {
        event.preventDefault();

        if (type == 'package') {
            dispatch(updatePrice(parseInt(package_price), type));
            Swal.fire(
                'Actualizado!',
                'El valor de los paquetes fue actualizado a $ ' + package_price,
                'success'
            )
        } else {
            dispatch(updatePrice(parseInt(album_price), type));
            Swal.fire(
                'Actualizado!',
                'El valor de los àlbumes fue actualizado a $ ' + album_price,
                'success'
            )
        }

        getPricesNow();
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
                <button onClick={ onAddOrder } className="header-container-button">Agregar pedido</button>
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
                                            <td data-label="Cliente">{pedido.name}<button onClick={ () => onInfoClick(pedido.client_info) } className="table-pedidos-action button-blue"><i className="fas fa-info"></i></button></td>
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
                            <p>Precio actual: $ {prices[1]}</p>
                            <form>
                                $<input value={ package_price } name="package_price" onChange={ onInputChange } className="config-input" type="number" />
                                <button onClick={ (e) => savePrice(e,'package') } className="table-pedidos-action button-blue" type="submit"><i className="fas fa-save"></i></button>
                            </form>
                        </div>
                        <div className="config-container">
                            <p>Precio de álbum</p>
                            <p>Precio actual: $ {prices[0]}</p>
                            <form>
                                $<input value={ album_price } name="album_price" onChange={ onChangeInput } className="config-input" type="number" />
                                <button onClick={ (e) => savePrice(e,'album') } className="table-pedidos-action button-blue" type="submit"><i className="fas fa-save"></i></button>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

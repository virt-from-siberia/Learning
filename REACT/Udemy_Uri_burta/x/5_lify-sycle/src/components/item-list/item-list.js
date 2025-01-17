import React, { Component } from "react";

import "./item-list.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {
    state = {
        itemList: null,
    };

    componentDidMount() {
        const { getData } = this.props;

        getData().then((itemList) => {
            this.setState({
                itemList,
            });
        });
    }

    renderItems(arr) {
        console.log(arr);
        return arr.map((item) => {
            console.log(item);
            const { id } = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    className='list-group-item'
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            );
        });
    }

    render() {
        const { itemList } = this.state;

        if (!itemList) {
            return <Spinner />;
        }

        const items = this.renderItems(itemList);

        return <ul className='item-list list-group'>{items}</ul>;
    }
}

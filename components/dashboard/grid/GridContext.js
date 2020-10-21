import React, {createContext, useState} from "react";


const GridContext = createContext({items: []});

export class GridProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    src:
                        "https://images.pexels.com/photos/2575279/pexels-photo-2575279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    id: "8c4440jj80-9egj02-4946-9205-ea65ed81a66f"
                },
                {
                    src:
                        "https://images.pexels.com/photos/1029609/pexels-photo-1029609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    id: "0a62f9fa-6f5c-4b09-8ff0-d2b9169426f9"
                },
                {
                    src:
                        "https://images.pexels.com/photos/1122414/pexels-photo-1122414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    id: "308f0373-a548-4802-8824-a1429ed3e801"
                },
                {
                    src:
                        "https://images.pexels.com/photos/2698761/pexels-photo-2698761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    id: "3c36057f-b11de-4fc0-bc52-334c2339741a"
                },
                {
                    src:
                        "https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                    id: "1"
                }],
            moveItem: this.moveItem,
            setItems: this.setItems
        };
    }

    render() {
        return (
            <GridContext.Provider value={this.state}>
                {this.props.children}
            </GridContext.Provider>
        );
    }
}

export default GridContext;
import { Component, ReactNode } from "react";

export class MainPage extends Component {
    render(): ReactNode {
        return <div className="">
            <h1 className="block text-center mt-24 mb-12 font-bold text-zinc-800 text-6xl">Club analytics app</h1>
            <div className="flex justify-center">
                <p className="text-center w-1/2 text-blue-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel efficitur purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas eu congue tellus, a fringilla est. Nulla gravida vel ex et sagittis. Vivamus eu egestas metus, eget gravida massa. Aenean diam ligula, facilisis id semper ac, pellentesque sit amet urna. Phasellus porttitor ex ac tristique faucibus. Nullam mollis ut nibh sit amet posuere. Donec at condimentum lacus. </p>
            </div>
        </div>
    }
}
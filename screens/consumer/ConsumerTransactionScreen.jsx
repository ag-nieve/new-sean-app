import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as Print from 'expo-print';
import { useUserStore } from "../../zustand_store/auth";
// import { shareAsync } from 'expo-sharing';

export default function ConsumerTransactionScreen(props){

    const [isVisible, setIsVisible] = useState(false);
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState();
    const [action, setAction] = useState(0);
    const [newData, setNewData] = useState({});
    const [selectedPrinter, setSelectedPrinter] = useState();

    const user = useUserStore((state) => state.user);

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/consumer_transactions.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            const selectedTrans = [];

            for(let i=0; i < objKeys.length; i++){
                console.log("INCLUDED: ", result[objKeys[i]]);
                if(result[objKeys[i]].consumer.email === user.email){
                    console.log("include me!!");
                    selectedTrans.push(objKeys[i]);
                }
            }
            setProductIds(selectedTrans);
            setProducts(result);

            console.log(selectedTrans);
        })();
    }, [action]);

    const printHandler = async () => {
        const html = `
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            </head>
            <body">
                <h1 style="text-align: center;">Transaction History</h1>

                ${productIds.length > 0 && productIds.map((item)=> `
                <div style="padding: 1.5rem;    ">
                    <p>Date and Time: ${new Date(products[item].dateTime).toLocaleDateString()} ${new Date(products[item].dateTime).toLocaleTimeString()}</p>
                    <p>Quantity Purchased: ${products[item].quantiy}</p>
                    <p>Product Information:</p>
                    <p>Name: ${products[item].product.name}</p>
                    <p>Description: ${products[item].product.description}</p>
                    <p>Price: ${products[item].product.price}</p>
                    <br />
                    <p>Farmer Information:</p>
                    <p>Name: ${products[item].consumer.name}</p>
                    <p>Name: ${products[item].consumer.email}</p>
                    <p>Name: ${products[item].consumer.address}</p>
                    <hr />
                <div>
                `)}
            </body>
            </html>
            `;

            await Print.printAsync({
                html,
                printerUrl: selectedPrinter?.url, // iOS only
              });
    }

    return <View className={'flex flex-1 p-3'}>
            <View className={"flex flex-1"}>
            <TouchableOpacity onPress={printHandler} className={'bg-blue-500 py-3 mb-5 px-4 rounded-xl'}>
                <Text className={'text-white text-center'}>Print Transactions</Text>
            </TouchableOpacity>
                {
                    productIds.length > 0 ?
                    <FlashList
                    data={productIds}
                    renderItem={({ item }) => <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                        <Text className={'mb-5 bg-blue-100 py-2'}>{new Date(products[item]?.dateTime).toLocaleDateString()} {new Date(products[item]?.dateTime).toLocaleTimeString()}</Text>
                        <View className={'flex flex-row items-center justify-between mb-3'}>
                            <Text className={'text-lg'}>{products[item]?.product?.name}</Text>
                            <Text className={'text-lg'}>Php. {products[item]?.product?.price} / Kilo</Text>
                        </View>

                        <Text className={'mb-3'}>{products[item]?.product?.description}</Text>
                        <View className={'flex flex-row justify-between items-center'}>
                            <Text className={'text-lg'}>{products[item]?.quantity} pcs.</Text>
                        {
                            products[item]?.product?.category && <View className={'flex  w-2/4 py-2 px-2 bg-green-200 rounded-full mb-3'}>
                                <Text className={'text-center'}>{products[item]?.product?.category}</Text>
                            </View>
                        }
                        </View>
                        <View>
                            <Text className={'text-lg'}>Farmer Profile</Text>
                            <Text>{products[item]?.farmer?.username}</Text>
                            <Text>{products[item]?.farmer?.email}</Text>
                            <Text>{products[item]?.farmer?.address}</Text>
                        </View>
                        <View>
                            {/* <Text>{}</Text> */}
                        </View>
                    </View>}
                    estimatedItemSize={200}
                    />
                    : <Text className={'text-center'}>No Data.</Text>
                }
            </View>
        </View>
}
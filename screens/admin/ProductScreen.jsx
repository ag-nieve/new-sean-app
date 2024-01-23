import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AddProductModal from "./components/AddProductModal";
import { FlashList } from "@shopify/flash-list";


export default function ProductScreen(props){

    const [isVisible, setIsVisible] = useState(false);
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState();
    const [action, setAction] = useState(0);
    const [newData, setNewData] = useState({});

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            setProductIds(objKeys);
            setProducts(result);

        })();
    }, [action]);

    return <View className={'flex flex-1 p-3'}>
                <AddProductModal setNewData={setNewData} setAction={setAction} isVisible={isVisible} setIsVisible={setIsVisible} />
                <TouchableOpacity className={'rounded-xl px-4 py-3 bg-blue-500 mb-5'} onPress={()=> {
                    setIsVisible(true);
                }}>
                    <Text className={'text-center text-white'}>Add Product</Text>
                </TouchableOpacity>
                <View className={"flex flex-1"}>
                    {
                        productIds.length > 0 ?
                        <FlashList
                        data={productIds}
                        renderItem={({ item }) => <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                            <View className={'flex flex-row items-center justify-between mb-3'}>
                                <Text className={'text-lg'}>{products[item] ? products[item].name : newData.name}</Text>
                                <Text className={'text-lg'}>Php. {products[item] ? products[item].price : newData.price} / Kilo</Text>
                            </View>

                            <Text className={'mb-3'}>{products[item] ? products[item].description : newData.description}</Text>
                            
                                <View className={'flex flex-row justify-between items-center'}>
                                <View className={'flex w-2/4 py-2 px-2 bg-green-200 rounded-full mb-3'}>
                                    <Text className={'text-center'}>{products[item] ? products[item].category : newData.category}</Text>
                                </View>
                                <Text>Quantity: {products[item] ? products[item].quantity : newData.quantity}</Text>
                                {/* <TouchableOpacity className={'bg-red-500 rounded-lg py-2 px-4'}>
                                    <Text className={'text-white text-center'}>Delete</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>}
                        estimatedItemSize={200}
                        />
                        : <Text className={'text-center'}>No Data.</Text>
                    }
                </View>
            </View>
}
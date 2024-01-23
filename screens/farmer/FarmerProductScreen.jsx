import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SellModal from "./components/SellModal";

export default function FarmerProductScreen(props){

    const [isVisible, setIsVisible] = useState(false);
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState();
    const [newData, setNewData] = useState({});
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedId, setSelectedId] = useState();

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            setProductIds(objKeys);
            setProducts(result);

        })();
    }, []);

    return <View className={'flex flex-1 p-3'}>
                <SellModal selectedId={selectedId} setNewData={setNewData} isVisible={isVisible} setIsVisible={setIsVisible} />
                <View className={"flex flex-1"}>
                    {
                        productIds.length > 0 ?
                        <FlashList
                        data={productIds}
                        renderItem={({ item }) => <TouchableOpacity onPress={()=> {
                            setSelectedId(item);
                            setIsVisible(true);
                        }}>
                            <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                            <View className={'flex flex-row items-center justify-between mb-3'}>
                                <Text className={'text-lg'}>{products[item] ? products[item].name : newData.name}</Text>
                                <Text className={'text-lg'}>Php. {products[item] ? products[item].price : newData.price} / Kilo</Text>
                            </View>

                            <Text className={'mb-3'}>{products[item] ? products[item].description : newData.description}</Text>
                            <View className={'flex flex-row justify-between items-center mb-3'}>
                                <View className={'flex  w-2/4 py-2 px-2 bg-green-200 rounded-full'}>
                                    <Text className={'text-center'}>{products[item] ? products[item].category : newData.category}</Text>
                                </View>
                                <Text>Quantity: {products[item] ? products[item].quantity : newData.quantity}</Text>
                            </View>
                            <View className={'flex'}>
                                {/* <TouchableOpacity className={'bg-red-500 rounded-lg py-2 px-4'}>
                                    <Text className={'text-white text-center'}>Delete</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        </TouchableOpacity>}
                        estimatedItemSize={200}
                        />
                        : <Text className={'text-center'}>No Data.</Text>
                    }
                </View>
        </View>
}
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useUserStore } from "../../zustand_store/auth";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function FarmerDashboardScreen(props){

    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState();

    const [adminProductIds, setAdminProductIds] = useState([]);
    const [adminProducts, setAdminProducts] = useState();

    const { navigation } = props;

    const user = useUserStore((state) => state.user);

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            setAdminProductIds(objKeys);
            setAdminProducts(result)
        })();
    }, []);

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/farmer_transactions.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            const selectedTrans = [];

            for(let i=0; i < objKeys.length; i++){
                console.log("INCLUDED: ", result[objKeys[i]]);
                if(result[objKeys[i]].farmer.email === user.email){
                    console.log("include me!!");
                    selectedTrans.push(objKeys[i]);
                }
            }
            setProductIds(selectedTrans);
            setProducts(result);

            console.log(selectedTrans);
        })();
    }, []);

    return  <View className={'flex flex-1 p-3'}>
    <View className={'p-5 bg-orange-400 rounded-xl mb-5'}>
        <Text className={'text-6xl text-white'}>{productIds.length}</Text>
        <Text className={'text-2xl text-white'}>Transaction</Text>
    </View>
    <View className={'flex flex-1'}>
    {
                        adminProductIds.length > 0 ?
                        <FlashList
                        estimatedItemSize={4}
                        data={adminProductIds}
                        renderItem={({ item, index }) =>{

                            console.log(index);
                            if(index <= 2){
                                return <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                            <View className={'flex flex-row items-center justify-between mb-3'}>
                                <Text className={'text-lg'}>{adminProducts[item] ? adminProducts[item].name : newData.name}</Text>
                                <Text className={'text-lg'}>Php. {adminProducts[item] ? adminProducts[item].price : newData.price} / Kilo</Text>
                            </View>

                            <Text className={'mb-3'}>{adminProducts[item] ? adminProducts[item].description : newData.description}</Text>
                            <View className={'flex  w-2/4 py-2 px-2 bg-green-200 rounded-full mb-3'}>
                                <Text className={'text-center'}>{adminProducts[item] ? adminProducts[item].category : newData.category}</Text>
                            </View>
                            <View className={'flex'}>
                                {/* <TouchableOpacity className={'bg-red-500 rounded-lg py-2 px-4'}>
                                    <Text className={'text-white text-center'}>Delete</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                            }
                            
                        }}
                        />
                        : <Text className={'text-center'}>No Data.</Text>
                    }
                    <TouchableOpacity onPress={()=> navigation.navigate('FarmerProduct')} className={'bg-blue-600 rounded-xl py-4 px-4'}>
                        <Text className={'text-center text-white'}>View More</Text>
                    </TouchableOpacity>
    </View>
</View>
}
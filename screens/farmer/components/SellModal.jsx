import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { useUserStore } from "../../../zustand_store/auth";


async function updateProduct(productId, quantity){
    const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`;

    const options = {
        method: "PATCH",
        body: JSON.stringify({
            'quantity' : quantity,
        })
    }

    const response = await fetch(base_url, options);
    console.log("response: ", await response.json());
}

export default function SellModal(props){
    
    const { isVisible, setIsVisible, setNewData, selectedId } = props;

    console.log(selectedId);

    const [quantity, setQuantity] = useState("0");
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [action, setAction] = useState(0);

    const user = useUserStore((state) => state.user);

    console.log("selectedId: ", selectedId);

    useEffect(()=> {
        
        (async () => {
            const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products/${selectedId}.json`;
            const response = await fetch(base_url);
            const result = await response.json();
            console.log("result: ", result);
            setSelectedProduct(result);
            setAction(prev => prev + 1);
        })();

    }, [selectedId, quantity]);

    const sellHandler = async () => {
        const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/farmer_transactions.json`;
        
        const options = {
            method: "POST",
            body: JSON.stringify({
                'product': selectedProduct,
                'farmer' : user,
                'quantity' : quantity,
                'dateTime': new Date()
            })
        }

        
        console.log("resultUpdate: ", resultUpdate);

        const response = await fetch(base_url, options);
        console.log("response: ", await response.json());

        console.log("selectedProduct Quantity: ", selectedProduct?.quantity);

        const totalQuantity = selectedProduct.quantity ? (parseInt(selectedProduct?.quantity) + parseInt(quantity)) : parseInt(quantity);
        const resultUpdate = await updateProduct(selectedId, totalQuantity);
        
        setIsSuccess(true);
        setAction((prev) => prev + 1);
        setIsVisible(false);
        setQuantity("0");

        setNewData({
            'product': selectedProduct,
            'farmer' : user,
            'quantity' : totalQuantity,
            'dateTime': new Date()
        })

    };

    return <Modal
    className={'flex'}
    animationType="slide"
    transparent={false}
    visible={isVisible}
    onRequestClose={() => {
      setIsVisible(!isVisible);
    }}
  >
  <SafeAreaView className="flex-1">
    <View className={'flex flex-1 p-5'}>
        <View className={'flex flex-row justify-between mb-10'}>
            <Text className={'text-center text-2xl'}>Sell Product</Text>
            <TouchableOpacity onPress={()=> setIsVisible(false)}>
                <Ionicons name="close" size={30} color="#606060" />
            </TouchableOpacity>
        </View>
        <View>
            <View className={'flex w-full items-center'}>
                <Image className={'w-full h-44 mb-3 rounded-lg'} src={selectedProduct?.image ? selectedProduct?.image : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} />
            </View>
            <View className={'flex flex-row justify-between items-center mb-3'}>
            <View className={'bg-green-200 rounded-full w-2/4 py-2 px-3'}>
                <Text className={'text-center'}>{selectedProduct?.category}</Text>
            </View>
            <Text className={'text-lg'}>
                Quantity: {selectedProduct?.quantity}
            </Text>
            </View>
            <View className={'flex flex-row items-center justify-between mb-3'}>
                <Text className={'text-lg'}>{selectedProduct?.name}</Text>
                <Text className={'text-lg'}>Php. {selectedProduct?.price}</Text>
            </View>

            <Text className={'mb-5'}>
                {selectedProduct?.description}
            </Text>
            
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-3'}
                placeholder="Quantity per Kilo" 
                value={quantity}
                onChangeText={setQuantity}  
                keyboardType="numeric"          
            />

            {/* 
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-5'}
                placeholder="Category Description"
                multiline={true}  
                value={description}
                onChangeText={setDescription}           
            /> */}
            <TouchableOpacity className={'bg-blue-500 px-4 py-3 rounded-xl mb-3'} onPress={sellHandler}>
                <Text className={'text-center text-white'}>Sell Product</Text>
            </TouchableOpacity>
            <TouchableOpacity className={'bg-gray-500 px-4 py-3 rounded-xl'} onPress={()=> {
                setIsVisible(false)
            }}>
                <Text className={'text-center text-white'}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  </Modal>
}
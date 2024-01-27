import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity, SafeAreaView, Image } from "react-native";


export default function AddCategoryModal(props){

    const { isVisible, setIsVisible, setAction, setNewData } = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);
    
    const addCategoryHandler = async () => {
        const base_url = `https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`;

        const options = {
            method: "POST",
            body: JSON.stringify({
                'name': name,
                'image': image,
                'description' : description,
                'dateTime': new Date()
            })
        }

        const response = await fetch(base_url, options);
        console.log("response: ", await response.json());
        
        setIsSuccess(true);
        setAction(prev => prev + 1);
        setIsVisible(false);

        setNewData({
            name: name,
            description: description,
            image: image
        });

        setImage("");
        setName("");
        setDescription("");

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
            <Text className={'text-center text-2xl'}>Add Category</Text>
            <TouchableOpacity onPress={()=> setIsVisible(false)}>
                <Ionicons name="close" size={30} color="#606060" />
            </TouchableOpacity>
        </View>
        <View>
            <View className={'flex w-full items-center'}>
                <Image className={'w-full h-44 mb-3'} src={image ? image : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} />
            </View>
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-3'}
                placeholder="Category Image" 
                value={image}
                onChangeText={setImage}            
            />
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-3'}
                placeholder="Category Name" 
                value={name}
                onChangeText={setName}            
            />
            <TextInput 
                className={'px-4 py-2 rounded-xl w-full border border-gray-100 mb-5'}
                placeholder="Category Description"
                multiline={true}  
                value={description}
                onChangeText={setDescription}           
            />
            <TouchableOpacity className={'bg-blue-500 px-4 py-3 rounded-xl mb-3'} onPress={addCategoryHandler}>
                <Text className={'text-center text-white'}>Add Category</Text>
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
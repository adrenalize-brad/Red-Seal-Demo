import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import ProductForm from '../components/cart/addToCart'
import { SRLWrapper } from "simple-react-lightbox";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Product = ({ pageContext: { product } }) => {

    return(

        <div className="m-1 shadow-lg rounded-sm bg-white">

            <h1 className="text-4xl font-bold w-full text-center py-4">{product.title}</h1>

            <div className="flex flex-col lg:flex-row py-5">     

                <div className="gallery w-full lg:w-5/8">

                    <SRLWrapper>
                    
                        <div className="w-full p-5">

                            {product.images.slice(0, 1).map((image) => {

                            return(
                                <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} className="w-full p-20 cursor-pointer rounded-sm shadow-md" alt={`${product.title} Image`} />
                            )
                            })}

                        </div>

                        <div className="grid grid-cols-4 gap-2 px-5">
                        
                            {product.images.slice(1, 5).map((image) => {

                            return(
                                <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} className="cursor-pointer rounded-sm shadow-md transform hover:scale-105" alt={`${product.title} Image`} />
                            )
                            })}

                        </div>

                    </SRLWrapper>
                    
                </div>

                <div className="flex flex-col w-full lg:w-3/8 px-5 py-2">

                    <h3 className="border-b-2 border-primary-600 pt-2 mb-3 text-2xl font-bold">Product Details</h3>
                            <div className="flex flex-row items-center"><span className="text-xl font-semibold pr-2">Vendor: </span><span className="text-xl">{product.vendor}</span></div> 
                            <div className="flex flex-row items-center"><span className="text-xl font-semibold pr-2">Product Type: </span><span className="text-xl">{product.productType}</span></div>

                            {product.variants.map((variant) => {
                                return(
                                    <React.Fragment>
                                        <div className="flex flex-row items-center"><span className="text-xl font-semibold pr-2">Model / SKU: </span><span className="text-xl">{variant.sku}</span></div>
                                    </React.Fragment>
                                )
                            })}   

                    <h3 className="border-b-2 border-primary-600 pt-2 mb-5 text-2xl font-bold">Product Description</h3>

                    <div className="product-description" dangerouslySetInnerHTML={{__html: `${product.descriptionHtml}`}}/>

                    <ProductForm product={product}/>
                        
                </div>  
                
            </div>

                <Tabs className="flex flex-col text-center md:text-left md:p-5">

                    <TabList className="md:border-b-2 md:border-primary-600 mb-5 text-3xl font-bold flex flex-col md:flex-row cursor-pointer">

                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Product Specs</h4></Tab>
                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Shipping</h4></Tab>
                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Warranty</h4></Tab>
                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Financing</h4></Tab>

                    </TabList>
         
                    <TabPanel className="text-xl flex flex-col pl-1">
                        <div className="product-specs text-left p-2" dangerouslySetInnerHTML={{__html: `${product.descriptionHtml}`}}/>        
                    </TabPanel>

                    <TabPanel className="text-xl flex flex-col pl-1">
                            Shipping Information
                    </TabPanel>

                    <TabPanel className="text-xl flex flex-col pl-1">
                            Warranty Information
                    </TabPanel>

                    <TabPanel className="text-xl flex flex-col pl-1">
                            Financing Options
                    </TabPanel>

                </Tabs>
                   

        </div>
    )
}

export default Product
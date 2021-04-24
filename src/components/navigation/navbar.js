import React, { useState, useRef, useEffect } from 'react'
import { useOnClickOutside } from '../../hooks/closeMenu'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { NavLogo, MenuToggle, NavMenu, CartToggle, CartOverlay } from './components'
import { StyledNav } from './components.styled'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faFacebookF as Facebook, faLinkedinIn as LinkedIn, faInstagram as Instagram, faPinterestP as Pinterest } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

	const data = useStaticQuery(graphql`
	{
	graphCmsSiteId {
		title
		caption
		description
		logo {
		  localFile {
			childImageSharp {
			  gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
			}
		  }
		}
	  },
	graphCmsNavigation(menuTitle: {eq: "Main Navigation"}) {
		menuCategories {
			title
			categories {
				title
				slug
			}
	  	}
	}
	}`)

	const siteID = data.graphCmsSiteId;
	const navigation = data.graphCmsNavigation;

	const [open, setOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);

	const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

	const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        const offset=window.scrollY;
        if(offset > 100){
            setScrolled(true);
        }
        else{
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let navbarClasses=['navbar'];
    if(scrolled){
        navbarClasses.push('scrolled');
    }
    
    if (typeof window !== "undefined") {
        require("smooth-scroll")('a[href*="#"]')
    }


    return(

		<StyledNav ref={node} className={`${navbarClasses.join(" ")} flex flex-row items-center w-full bg-primary-700 px-3`}>

			<NavLogo
				title={siteID.title}
				caption={siteID.caption}
				logoImage={siteID.logo.localFile.childImageSharp.gatsbyImageData}
				homeUrl="/"
			/>

			<div className="flex flex-row items-center absolute right-4">

				<Link to="/search" alt="Product Search">
					<Icon icon={faSearch} className="text-white text-2xl lg:text-3xl m-1"/>
				</Link>

				<CartToggle open={cartOpen} setOpen={setCartOpen} />

				<MenuToggle open={open} setOpen={setOpen} />

			</div>

			<CartOverlay open={cartOpen} setOpen={setCartOpen} className="cart-overlay fixed shadow-lg rounded-sm border-2 bg-white p-2 md:p-3"/>

			<NavMenu open={open} setOpen={setOpen} className="shadow-lg rounded-sm border-2 bg-white p-3">			

					{navigation.menuCategories.map((menuCategory) => {

						return(

							<div>

							<div className="border-b-2 border-primary-600">
								<span className="text-2xl md:text-3xl font-semibold">{menuCategory.title}</span>
							</div>

							<div className="flex flex-col py-2">

								{menuCategory.categories.map((category) =>{

									return(

										<Link className="hover:text-primary-600" to={`/${category.slug}`} alt={category.title} onClick={() => setOpen(!open)}>
											<span className="text-xl md:text-2xl ml-1 font-regular">{category.title}</span>
										</Link>

									)
								})}

							</div>				

							</div>
						)
					})}

				<div className="w-full">

				<div className="border-b border-primary-600 mb-2">
					<span className="text-xl font-regular">Find Us On Social Media</span>
				</div>

				<div className="flex flex-row items-center">
					<a href="" alt="" className="hover:text-primary-500 mr-2"><Icon className="filter drop-shadow-lg" icon={Facebook} size="2x"/></a>
					<a href="" alt="" className="hover:text-primary-500 mx-2"><Icon className="filter drop-shadow-lg" icon={Instagram} size="2x"/></a>
					<a href="" alt="" className="hover:text-primary-500 mx-2"><Icon className="filter drop-shadow-lg" icon={Pinterest} size="2x"/></a>
					<a href="" alt="" className="hover:text-primary-500 mx-2"><Icon className="filter drop-shadow-lg" icon={LinkedIn} size="2x"/></a>
				</div>

				</div>


			</NavMenu>

		</StyledNav>

    )
}

export default Navbar
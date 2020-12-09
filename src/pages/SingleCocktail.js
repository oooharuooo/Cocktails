import React, { useState, useEffect,useCallback } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);

  const fetchSingleCocktail = useCallback(async () => {
    const { data: { drinks } } = await axios.get(`${url}${id}`);

    if (drinks) {
          const {
						strDrink: name,
						strDrinkThumb: image,
						strAlcoholic: info,
						strCategory: category,
						strGlass: glass,
						strInstructions: instructions,
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					} = drinks[0];

					const ingredients = [
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					];

      const newCocktail = {
        name,
        image,
        info,
        glass,
        instructions,
        ingredients,
        category,
      };
      setCocktail(newCocktail)
    }else setCocktail(null)
  },[id])
 
  useEffect(() => {
		setLoading(false);
		try {
			fetchSingleCocktail();
		} catch (err) {
			console.log(err);
			setLoading(true);
		}
	}, [id, fetchSingleCocktail]);
  
  if(loading) return <Loading />
  if (!cocktail) return <Loading />;
  const { name, image, category, info, glass, instructions, ingredients } = cocktail;
  
  return (
		<section className="section cocktail-section">
			<Link to="/" className="btn btn-primary">
				Back Home
			</Link>
			<h2 className="section-title">{name} </h2>
			<div className="drink">
				<img src={image} alt={name} />
				<div className="drink-info">
					<p>
						<span className="drink-data">Name:</span>
						{name}
					</p>
					<p>
						<span className="drink-data">category:</span>
						{category}
					</p>
					<p>
						<span className="drink-data">info:</span>
						{info}
					</p>
					<p>
						<span className="drink-data">glass:</span>
						{glass}
					</p>
					<p>
						<span className="drink-data">instructions:</span>
						{instructions}
					</p>
					<p>
						<span className="drink-data">ingredients:</span>
            {ingredients.map((recipe, index) => {
              return recipe ? <span className=""key={index}>{recipe}</span> : null
              })}
					</p>
				</div>
			</div>
		</section>
	);
}

export default SingleCocktail

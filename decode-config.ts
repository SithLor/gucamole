//@ts-ignore
import * as fs from 'fs';
import cryptoJs from 'crypto-js';

const key = "Th!nkTw!ce";
//@ts-ignore
const data = {
	"success": true,
	"skiplist": [{
			"zoom.us": 7200
		},
		{
			"meet.google.com": 7200
		},
		{
			"hangouts.clients6.google.com": 7200
		},
		{
			"clever.com": 7200
		},
		{
			"googleads.g.doubleclick.net": 86400
		},
		{
			"launchpad.classlink.com": 86400
		},
		{
			"canvas.apps.chrome": 86400
		},
		{
			"login.i-ready.com": 86400
		}
	],
	"ttl": 3600,
	"selfharmlist": [
		"800-273-8255",
		"800 273 8255",
		"800-273-TALK",
		"800 273 TALK",
		"833 456 4566",
		"833-456-4566",
		"800-422-4453",
		"800 422 4453",
		"800-799-7233",
		"800 799 7233",
		"800-799-SAFE",
		"800 799 SAFE",
		"800-784-2433",
		"800 784 2433",
		"800-SUICIDE",
		"800 SUICIDE",
		"866-4-U-TREVOR",
		"866-488-7386",
		"866 488 7386",
		"800-4-A-Child",
		"808-2000-247",
		"808 2000 247",
		"suicide helpline",
		"suicide prevention helpline",
		"suicide hotline",
		"suicide prevention hotline",
		"help is available"
	],
	"vectorExpansionRules": {
		"instagram.com": [{
			"pattern": "*/web/comments/*/add*",
			"field": "requestBody|formData|comment_text!0",
			"content": "PLAIN",
			"context": "COMMENT"
		}],
		"quora.com": [{
				"pattern": "*graphql/gql_POST*",
				"field": "variables|titlePlaintext",
				"content": "ENCODED",
				"context": "QUESTION"
			},
			{
				"pattern": "*graphql/gql_POST*",
				"field": "variables|content||sections!0|spans!0|text",
				"content": "DOUBLE_ENCODED",
				"context": "COMMENT"
			}
		],
		"pinterest.co.uk": [{
			"pattern": "*resource/PinResource/create/*",
			"field": [
				"options|title",
				"options|description"
			],
			"content": "JSON_STR",
			"data": "requestBody|formData|data",
			"context": "POST"
		}],
		"pinterest.com": [{
			"pattern": "*resource/PinResource/create/*",
			"field": [
				"options|title",
				"options|description"
			],
			"content": "JSON_STR",
			"data": "requestBody|formData|data",
			"context": "POST"
		}],
		"in.pinterest.com": [{
			"pattern": "*resource/PinResource/create/*",
			"field": [
				"options|title",
				"options|description"
			],
			"content": "JSON_STR",
			"data": "requestBody|formData|data",
			"context": "POST"
		}],
		"tumblr.com": [{
				"pattern": "*/svc/post/update*",
				"field": [
					"post[one]",
					"post[two]",
					"post[tags]"
				],
				"content": "ENCODED",
				"context": "POST"
			},
			{
				"pattern": "*/api/v2/blog/*/posts*",
				"field": [
					"content",
					"tags"
				],
				"content": "ENCODED",
				"context": "POST"
			}
		],
		"reddit.com": [{
				"pattern": "*api/comment*",
				"field": "richtext_json",
				"content": "ENCODED_STR",
				"context": "COMMENT"
			},
			{
				"pattern": "*api/submit*",
				"field": [
					"requestBody|formData|title!0",
					"requestBody|formData|richtext_json!0"
				],
				"content": "PLAIN",
				"context": "POST"
			}
		],
		"youtube.com": [{
				"pattern": "*comment/create_comment*",
				"field": "commentText",
				"content": "ENCODED",
				"context": "COMMENT"
			},
			{
				"pattern": "*comment/update_comment*",
				"field": "commentText",
				"content": "ENCODED",
				"context": "COMMENT"
			}
		],
		"tiktok.com": [{
			"pattern": "*comment/publish*",
			"field": "text",
			"content": "QUERY_PARAM",
			"context": "COMMENT"
		}]
	},
	"bullyPhrases": [
		"U2FsdGVkX18OWYNqozHw5E7q+R9ZgL2CARA4M+mlI4v4G1G84uCl199T0FuT3lYD",
		"U2FsdGVkX1+H6a6wRIbNDxe1mcKmcv8hvY5/XzURPuV7PrR0n4g7BkUJpxnOTkhM",
		"U2FsdGVkX191ig2tlSoUdA/HYfnRI7zAt40RvDvHsQl4ExL0tJ38MyZ8bMWh8XLi",
		"U2FsdGVkX1+kk4pl9shqyN1B38LpBylywPxohK2iZun8xCSc22ds73v5sBsYS5DdhOFxZdU5cBraTGAfCt/Xqg==",
		"U2FsdGVkX1/IojW7InyMWatHrYfGe7XgclIP/gZbV6eQaYFr14GJkKURopanslkn",
		"U2FsdGVkX18TidyfNK7zzoaiM/s+/6O9NVNb896E5/04k+gjz659RDeKWy/rPrBl",
		"U2FsdGVkX1+b2Fv73ZG2srUF4bXb86/S0hUGk/HuqtE=",
		"U2FsdGVkX1/28/AGvMEEvQ8aAgc4tA2hmOJi/3hfeRQ=",
		"U2FsdGVkX18u9s2mW3qydY7uGDDox84XWRnjLk8KPT8=",
		"U2FsdGVkX18nsE8xBWZvyd7qFe5sDisEmXDCcRwrwD4I8fbZfcwrNHKHlYN6ttYE",
		"U2FsdGVkX1+9s3hBApfsQI/bZe/qaei7vWKg5UB3CXxt6zh9sjaCw+zg2dgCTLm/",
		"U2FsdGVkX18q3RLdhN7h1if+gjA2zm6h+YGr/UmhYSo=",
		"U2FsdGVkX1/sCNNWVC10RFKj+GoQGLn3Ju/kgjl11YKI7tN3vGMnHD7pZak5KXtg",
		"U2FsdGVkX1/ssJCxw2CaR3Dd+kLJ5BG8vDMrtCjPH9U=",
		"U2FsdGVkX1/Dj32djuBbqiuDjfHBVBTtkvxkPymYHBFnIpuajIpRqJeM5rdNu0Sn",
		"U2FsdGVkX19E9ayKlZ1G22rdIDlxEw3tMG6rq4SwU7Grfa5Cumvc3u58bsEWqqrq",
		"U2FsdGVkX1/rdE2D2DDmx+gLRE0DvbDZxAupE4CIKrD0/tnuxY2tCINQ0WzL/lD/",
		"U2FsdGVkX1/PHIRDxbbbgl5fxvOYM91ki4MjiNtQ04NzbVDDO9xNjqXTP4YBiorp",
		"U2FsdGVkX1+nHn3OAecgrawEb/BagjnVB485I4G1bEdX/wamccslgo3pzMowk4Ar",
		"U2FsdGVkX19u0YAZZ8xCdk0UCWJI27wMMm+bMbiZ/QE=",
		"U2FsdGVkX18zvKIAJ7mr0glyzq3IRUjyoYbQffGMwkyXizEGguc+hjpn3IuQnLhO",
		"U2FsdGVkX1+b/w6/Gd5gde7EKuK9soCLgsyYbxyxPYzDlMCVQkwWMMfh71GMrvk+2EM69NEA4FWag0qStdYIkw==",
		"U2FsdGVkX18sPuLSC6V2ne5ARTc2nfjTYjovjuxUvGDCAaTbnbf6ylU/kI8+dY5D",
		"U2FsdGVkX1+ijR+40bllYlpAsG/nwnEsbaJtyDmi1c8=",
		"U2FsdGVkX1/qaT9sHu7s5VC0oziqLgGDcQ/FdzE5YL4=",
		"U2FsdGVkX1+R+BHQUAztP8DSHgZ74TdQH8OLKkHEkT8=",
		"U2FsdGVkX1+D/+qnT/71PkaEk0ZHNTtYbugvj7tlWiw=",
		"U2FsdGVkX1/DzGVPX2q5dl6YANEohPHoGtfM9mIcqnXqG0NcpRk4Ta5JKX2Z4Hif",
		"U2FsdGVkX19ekvLzGdzqD83CJ404l31xSs477sc68zDFqQqAhe2JcknRb1gx/HiYfUKwLWRhfGphz0XiRseJig==",
		"U2FsdGVkX1/ofTxPpS5RScxj5uM/Vpf3IRlkGoFydqY=",
		"U2FsdGVkX1+hhWMLFdW+emdp2EwzTRB1UTWBAXZy4ILNeciK5nry7I4lKF8aKK9N",
		"U2FsdGVkX19okY9CkQPxtmRsBl8eBtD4dRWkaU6JcblieBVdCRJFNK6I74tsTzgn",
		"U2FsdGVkX19I/hoCyurv/rx/Yk5YXUs3GY774eEcIOaunvMDYiFQu/HnbVSwA712",
		"U2FsdGVkX1/gtFcwl+p8tlygjmWjksKYFkV9GfgOlBAY1KrGOgSWt6NNW+JB2Zzw",
		"U2FsdGVkX19Wa5hkvA8PoeBXw7hg8ZRAFffz6kh1ox31ATY19ZBWBFFYgX/O1LkR",
		"U2FsdGVkX19k58cdrmFHPf4VJGmvzuVzXWVxmcIw6Jgo7DI+Cg9RHE/Vim0mitVH",
		"U2FsdGVkX19H2GW08RgDdS73nqBOuVvhX1KLldFhjf2H6Zj4VzsfINyME8QPVvCY",
		"U2FsdGVkX18IX9ERG/RWKfybNF6vhi0Xu6KDF3MYops=",
		"U2FsdGVkX1/yeg/iCk4AVBjysIb43mjjerBVbXvoAKA=",
		"U2FsdGVkX18uU2d44v83fcSsaL/soGIaIponveNpDyg=",
		"U2FsdGVkX1+rz7HJhlopkrkrQXXfhYG6fykZ6C5rO+Hfw3XDVBMldGxkRBfr8yls",
		"U2FsdGVkX19nUlSRCs94Sp6ZgSyZ0Bw5g4KZ2xC77NHMuIN0UBbXr8Ja36io4Hq2",
		"U2FsdGVkX18wZg92/WTQ0OsSiJfnoXI2IkLuUeee3c8wErm2q+KULy3EmWEovQ/S",
		"U2FsdGVkX19Sx1nX2gMeC+pJ40VJ+evEk9M7WZf+GC8=",
		"U2FsdGVkX182ctcncihhKXTgpQb0MK4QbqIJpCIa63I=",
		"U2FsdGVkX1/1SNa9v+s/tLJx400CI6CwupNdhs4jRg8jC7nlMNmSelmZJNdKF84F",
		"U2FsdGVkX1+PH+EY0/LKSWlOVUo22LGm5NK7XaVYhDs=",
		"U2FsdGVkX1/BGwyLzP5Lv9/CrZYX9YWu3Rh0+H5jDE+ExZH7IlpDY8F4ewCx5lIJ",
		"U2FsdGVkX1/MbGdbKg+ayKRi5RVT/jJwBYMXz64CR0Q=",
		"U2FsdGVkX1/jy/F0pIqw1PUmYNYe7bTwJfN9OXjflQ2DDf/y+KAJrxrQThCAIkbV",
		"U2FsdGVkX1/d/gTAdGXS5Sp/w9XD4Ig9IZ3S52iRGXJRdxuIuluhuPTSHux2wl/s",
		"U2FsdGVkX1+1rwudR96P2KWRStu+rmsyFBDKeQfFdCIQDEv5gAczeDi0hJ1QqbUm",
		"U2FsdGVkX187QPIn18bOdHUlaFy25n4A8K6TIXW34BsrwBdMvp5oFWhH5Wz5JbYu",
		"U2FsdGVkX18/sqiY0EM8rygwYMXEQRMJCPAphqvBvyGJVSjYL/IpF2Ch14WYVC3T",
		"U2FsdGVkX1+ait2DaFibpqkFbIEaDxI0+h5Ou9LCHN3FztH4puwXzID4B2w/Lyd7",
		"U2FsdGVkX1+v9/l5O2oKt8AnR+YFUXwUnQeghQ+Dq2PzUguukIXsgE+lZrtTwZIX",
		"U2FsdGVkX1+DQkvz+v+Ow/TpVyluMGn3ccjlxIWLlAJepSYjxPRiPd8wgHMfz0Gq",
		"U2FsdGVkX18m1k9auldIH2tSQ1AWUL+bIoU8DDYK6l5j/G0cColWK4XxS8j05Dtb",
		"U2FsdGVkX1/JX6F0mZcDuuyAGiVVpro1J/XtAmif3vo=",
		"U2FsdGVkX18lY90WN6nHdWjuYZXJ75AnGNbLUCKg1l0=",
		"U2FsdGVkX19dhAi408BPjXGnZaasruBLTjCNZUjMzO7UPMmKcEi+fVu3WVXCnnFJ",
		"U2FsdGVkX19vJJ7BFmYxADoaRxrQRarsC6Y3vJReqraN6mPSX6moar3tP8QtJPvi",
		"U2FsdGVkX199dE5YywjNnDm84OEB9iEC3bUcNGIynyY=",
		"U2FsdGVkX19h/OCL11/wne1G/bwKWE0wl1jfBytlDaw=",
		"U2FsdGVkX1/u072IrdxR6MXSdIFunzdXaK1y6AC50VE=",
		"U2FsdGVkX197n9G1Vtzp48FLxorJmJeqhftnLNuo17g=",
		"U2FsdGVkX18FA+fFIttSl1US8MQ1Cx5kk+i385NfsJg=",
		"U2FsdGVkX1+PvKI9jKBf/Sb0hE5SEDoem0JEjeYjXbQ=",
		"U2FsdGVkX19iyILItFkW+G43bpFDu39ze2etISEhrV4=",
		"U2FsdGVkX1/vMlohhwiDh19JbcT1bVbahEyeZezi86c=",
		"U2FsdGVkX1/GIcqEB9lwpxWF6gsd5r6V5n+4kketfBc=",
		"U2FsdGVkX1+572jChUmQVH5GcOEP/JYYJvZTi4JnkyA=",
		"U2FsdGVkX1+qPX9goZAxCVvPwA1KXw28Q7vCzh5v8II=",
		"U2FsdGVkX1+VbEr0TAv6v/HCODxRn+V/DlLe84ie/3A=",
		"U2FsdGVkX19dG6/huzLvod9AaYh5H1X3vzNAO5M7qOE=",
		"U2FsdGVkX1/IXBZkzGQslV5TES9GxDlcz0IlzVyohGs=",
		"U2FsdGVkX1+ua5ATM0TC5lgX2UlEwJ0oMmFPgVYSoW8=",
		"U2FsdGVkX1/DiwpjZTqypINkM6zRohHySlH9v6ss7xI=",
		"U2FsdGVkX1+FVCWj75a8na0ty+iauDd7QZaNRX3fMCM=",
		"U2FsdGVkX18gZHFTUeoM1mPUSQfbpjdR9wNZa39MKgE=",
		"U2FsdGVkX1/oIpxz8Uv3AMrel68d+0FaYMRrIN9SrsU=",
		"U2FsdGVkX1/2f7zMQh+Sxx7fDX/H1JoGRVyZaub6xfI=",
		"U2FsdGVkX1+7aM6WNFXRf+azgHlIwFDfHpeXH2dv4TU=",
		"U2FsdGVkX1+71+r4ukB8PKaQ2pT/MzerHpDQZQjVsm4=",
		"U2FsdGVkX1+KFv6QDH5IBDilPzXWQRr0PtFdW4cTTfg=",
		"U2FsdGVkX1/fnnhkfgFdM9VRl7SPF7rKGSlBLGRQEQI=",
		"U2FsdGVkX18xfkLuKhiS9KZqjKlOewWMw/HFqHA2Zdg=",
		"U2FsdGVkX18Kk4DDW/SwJ3f9hbWRgNBktaxDt0m5LS0=",
		"U2FsdGVkX1+0WH3LmaTZu2S1MPFamrr57JO1w5JdmqM=",
		"U2FsdGVkX1+JrqR58O9mHXbc6vQBbeuaHsWTUV4T3rQ=",
		"U2FsdGVkX1+PpZr/N+/vGkHbv2uufwwzgsPGKRHPClw=",
		"U2FsdGVkX1/wQBQNwYvrZEOd1teYKBun4kdpYC1z07E=",
		"U2FsdGVkX190iWuLBj//UBzC3Zym5tK38phroPVlmsY=",
		"U2FsdGVkX19YiznIIG+NfrZh+AnC6ndcLurVbqjxH0w=",
		"U2FsdGVkX18CaxIz5lIBbae57WCIt9+kh+zbNLa3E40=",
		"U2FsdGVkX19ir73QGl94ICq/nrwyduyAfXIm9OFYrZw=",
		"U2FsdGVkX19vivJoRmQMRIUk3O0n29wop7OYjUQB3Nc=",
		"U2FsdGVkX1/gVvE9/nkW3KAo7MeBv7SIE35xU2ISfjg=",
		"U2FsdGVkX182Jkx7Q4ZE+DupryGLFh7EaBO8UpKrslc=",
		"U2FsdGVkX1+HvtuwKLCOkv6MXPmiH00j/Tv6EulKVWc=",
		"U2FsdGVkX19/L5o/ciRrg2BEbZ6531TfABtrf52BO94=",
		"U2FsdGVkX1+n9alLgQEvw4DAMDLT1lzVRArMhndxdUU=",
		"U2FsdGVkX1/LMiTzUtezRSwQfGVuCcbDrqLum+KPe0I=",
		"U2FsdGVkX1+nE7VV7U2Knggnr6svHcvXc0gjRRY0WeM=",
		"U2FsdGVkX1+d6FpQxOup5pSGoQHXxSqjFn8F1Ch9p8E=",
		"U2FsdGVkX1+a24EyZbRqxcLm9RxcydRqkHj9pLAF15o=",
		"U2FsdGVkX18X7wzz6BySid10P2LqqAyitYXiu5cou+4=",
		"U2FsdGVkX1+a6CDe8fyUGKSqdxX2SX6kMaQtoYsQO04=",
		"U2FsdGVkX1+fngALE1Mz1OBvVpzB8hQWxBJRuzSxZW8=",
		"U2FsdGVkX1/9Dr3dslKjeOBlv6LJfqW9X6VGHyBDLgg=",
		"U2FsdGVkX1+P1Q5t/Q1sFRYXi1n5UmALJNhf5UpmzCs=",
		"U2FsdGVkX1+9DzXg2/9lx/U8T8OqFbjGugk+Epw7yLQ=",
		"U2FsdGVkX1+yC7SygqQjV1aN2esRYSDwdh+ZfubmcbU=",
		"U2FsdGVkX1+XtgLUOMDEAKjvCAhgEiorcWBrtT1CJUA=",
		"U2FsdGVkX19t+bJYZ28FBM1M3kHOMhwzMTMbzWVmXiA=",
		"U2FsdGVkX19fEBXpw/UQJ/vt7qy3gFF9alt6cCxgnBc=",
		"U2FsdGVkX19mQYPy54nkLzRYXzkb2BupISs4wOMybG0=",
		"U2FsdGVkX19X+ZuGvoxNm+2Og5sya8FaSS8w94xKbpg=",
		"U2FsdGVkX1+1BjpyE+kMNg5qJRaIhjfZeygW//xuCDyc/QKRWX+K3bZn/Uuzwi8G",
		"U2FsdGVkX1+Z+s8KP8NvbwCnkq0quMFxJ1frtFc0rlQ=",
		"U2FsdGVkX18399qHS7WJl0SiiR+8l4KHw8Keh3onQTg=",
		"U2FsdGVkX1/C3a4fqIbBuLUCALk/92d35eW3CWTP1lY=",
		"U2FsdGVkX18DNaxS4QP3dI6+soE8XCR6tAQJYQnm+YQ=",
		"U2FsdGVkX1/OX1d4R/A5DgGH8jqewGxwgpFIOR4Nsrw=",
		"U2FsdGVkX19/l7hAC2M+IqiQSn2wfeor4lpnjTaShmg=",
		"U2FsdGVkX19nOegMoR+bkwcETeup3LGHxwxyokWpvWA=",
		"U2FsdGVkX1/F34S0yLzNg5Wmz7xOYKPZZsJHJiZcabg=",
		"U2FsdGVkX18SaLyWwF7GDLJgACNd/hvrMqpcvjmrQNs=",
		"U2FsdGVkX18dyHekWHDz9uI7eg5Hjtj6X2+kKiqC1B8=",
		"U2FsdGVkX1+NLN8ZTIaGIIK6IMyJ0EqAu5z+GeVvDz0=",
		"U2FsdGVkX182LGS98sxSCHpHfsi5CpQejJm5YSUvSng=",
		"U2FsdGVkX19lTC+M3Q/BgCjzRWIadecXphNOD55o/24=",
		"U2FsdGVkX19bh4NLyWoL3sbGjdkjgmjiqKK0i7Pd0mY=",
		"U2FsdGVkX1/yengIIxX6e5dFkDm5NKpGRdt/oOsuLwM=",
		"U2FsdGVkX195+vKb8+xRbAESnrM97dBxKyDWSjnb+Mk=",
		"U2FsdGVkX1/P0bvkic0BWXoCY6ZfxVbdr9E9MUTznFE=",
		"U2FsdGVkX1/GR+5eNbcFnt8IbS3X+LyP0arykiMAh4Y=",
		"U2FsdGVkX19H9t2KZKMO16PoKuI7DEKgV9Ai97LoYCc=",
		"U2FsdGVkX19RxOcQjFjGGvv2XZV6udOdkSp5rYNcU10=",
		"U2FsdGVkX19+TzSC+EEmf+UYsasTzdEgxq8QiZCNjsw=",
		"U2FsdGVkX1+LkcRUIN5mFp1mNmnYG8LpvglqJJmlCyE=",
		"U2FsdGVkX1+YaYjSnPs/Sl/oi/k6ws4EhW/ZUXN5TgQ=",
		"U2FsdGVkX1/MtSvZn/dGlL7L+GsW8VT9VaGokYueJyU=",
		"U2FsdGVkX19t1vyiOS5p5ePmZwHkdDC3se96XXnQdvo=",
		"U2FsdGVkX180UAageBbWxduOYYAevGvLpdSYC+DrA6o=",
		"U2FsdGVkX18MfUvCKcD55fzC8fYPkVCcWcak6TxZ6iI=",
		"U2FsdGVkX1+9qVI2yy4nSeClAewOGlQ/nLrF38+H5lY=",
		"U2FsdGVkX19PtehwMqYaRfsZHbRLEQCNzE/N9dzA0Xg=",
		"U2FsdGVkX18NgZF0EE2vjZ7WRDBhPk8yKlSS6tOR5CkZAx1YjJsglnephGqs9frA",
		"U2FsdGVkX18kDwYNuvW9M4Bq+KduSdpHikxsVGdV9uLxntMsNU+K06tFgJhvjye0",
		"U2FsdGVkX1/PkxonDkfAGEECNog/60fAsgjXrcsM7JhWaiC4ezNVuf1MYQZFFWU3LRnCGYZ4VLCAwr7Yjx+3Vg==",
		"U2FsdGVkX1+r/g707SKkhbXxVCjvdAK6J+f4yGyq/OQ5js0cvbloDuq7FHFgHy6V",
		"U2FsdGVkX1+hhxOcbd3zZiRrTDSldlZg6kiIzZ0iS2ke9jwhpPnWAqiMbLBUHiJY",
		"U2FsdGVkX1/vjs46ooo0eFnG/jfT2v6EHooxfJpTm8lWtAXLrKqiUIRgIH/GSNWN",
		"U2FsdGVkX1/k4CiyH8pWWVSLolcGC+rfxL1qnB5BNsTlKqb1/3i1kAJSqagl/UzG",
		"U2FsdGVkX1+zFe3+iGY23FcSffjnM0lruaSdiNo4ra9oGUhJ9keKlExeLs2Opc8k",
		"U2FsdGVkX1/IadgrjWAQw6q3svCTGQqYr/pFROKB3qa1cIRiQX674OColHGxO2Be",
		"U2FsdGVkX1+ZYg/5DucirSBwKmXxXTdNHD5AphRX73g=",
		"U2FsdGVkX1/4EziPrBeH69695ySA8B3Tz21H/y7crQ8=",
		"U2FsdGVkX1+S3RwIPzKwNka83o+h84J5z4bdAdOmhtI=",
		"U2FsdGVkX180SFGTS0UseBHSJaC38bZF4rC6rCmBX/Q=",
		"U2FsdGVkX18WP2Z7ahmPk6VO1Le2b9LwKtCeULjrhls=",
		"U2FsdGVkX193UJWmcHic7RcLSwvInnHYOM18wcVrO/8=",
		"U2FsdGVkX19aq7G9UhG/gfu/DWzoOsNvANvw7ToeUk4=",
		"U2FsdGVkX1/EckygS5G0PZoVB+JqU9XKXBRCEldQre0=",
		"U2FsdGVkX183ruraMyal6zOE23Hw7q+wDepzaOu7DV4=",
		"U2FsdGVkX198S1qddz42YQHegjKF2NNRN5avaZE/UHs=",
		"U2FsdGVkX18hE7WXm1MNRnYC2euq93anWPeJE5AGFrM=",
		"U2FsdGVkX1+NL2FDnKYNcQRuJPJFVDNVwEA0AHxh6xM=",
		"U2FsdGVkX1+coOKeaeEnKvq2DMWoHQMao5tCe/5v7Wk=",
		"U2FsdGVkX1/AaWVt40uBqDGsAjavecdLUF88lacv/Mk="
	],
	"wlBullyPhrases": [
		"U2FsdGVkX1/dBxHVCFaSyt/EWE+pfDWdo+9/5vqMwmo=",
		"U2FsdGVkX1/YXjiWwsS2jOOhiWvBBJm/PXMkSO7Rm30="
	],
	"thinkTwiceSites": [
		"reddit.com",
		"tumblr.com",
		"pinterest.com",
		"in.pinterest.com",
		"pinterest.co.uk",
		"quora.com",
		"instagram.com",
		"facebook.com",
		"twitter.com",
		"mail.google.com",
		"chat.google.com",
		"tiktok.com",
		"youtube.com",
		"discord.com"
	],
	"thirdPartySSO": [
		"sts.platform.rmunify.com",
		"smartlogin.realsmart.co.uk"
	],
	"proxyIdentification": {
		"featureFlag": true,
		"proxyData": [{
				"proxyName": "rammerHead",
				"targetElements": [{
						"target": ".chrome-tabs",
						"content": null
					},
					{
						"target": ".browser-tab-content",
						"content": null
					}
				]
			},
			{
				"proxyName": "rammerHeadv2",
				"targetElements": [{
						"target": "title",
						"content": "Rammerhead Proxy"
					},
					{
						"target": "h1",
						"content": "Rammerhead Proxy"
					}
				]
			},
			{
				"proxyName": "interstellar",
				"targetElements": [{
						"target": ".logo",
						"content": "Interstellar"
					},
					{
						"target": "a[href='photography']",
						"content": "Proxy"
					}
				]
			},
			{
				"proxyName": "hypertabs",
				"targetElements": [{
						"target": ".chrome-tab-title",
						"content": "New Hypertab"
					},
					{
						"target": ".chrome-tabs-content",
						"content": null
					}
				]
			},
			{
				"proxyName": "hide_my_ass",
				"targetElements": [{
						"target": ".hma-top-logo",
						"content": null
					},
					{
						"target": ".hma-logo-link",
						"content": null
					}
				]
			},
			{
				"proxyName": "taco",
				"targetElements": [{
						"target": ".black_text",
						"content": "Ta‌co Pro‌xy"
					},
					{
						"target": "title",
						"content": "Ta‌co Pr‌oxy"
					}
				]
			},
			{
				"proxyName": "croxy",
				"targetElements": [{
						"target": "title[data-trans='yes']",
						"content": "The Most Advanced Secure And Free Web Proxy | CroxyProxy"
					},
					{
						"target": "a[href='https://github.com/croxy-proxy-official/extension']",
						"content": "manually"
					}
				]
			},
			{
				"proxyName": "electron",
				"targetElements": [{
						"target": "title",
						"content": "Electron"
					},
					{
						"target": "div#home p",
						"content": "A student's best friend!"
					}
				]
			},
			{
				"proxyName": "holy_unblocker",
				"targetElements": [{
						"target": "a[href='https://www.patreon.com/holyunblocker']",
						"content": null
					},
					{
						"target": "a[href='https://github.com/titaniumnetwork-dev/Holy-Unblocker']",
						"content": null
					}
				]
			},
			{
				"proxyName": "holy_unblockerv2",
				"targetElements": [{
						"target": "input[class='_thinPadLeft_1s88o_120']",
						"content": null
					},
					{
						"target": "h1",
						"content": "Ending Internet Censorship."
					}
				]
			},
			{
				"proxyName": "nebula",
				"targetElements": [{
						"target": "title",
						"content": "Nebula"
					},
					{
						"target": "a[class='stamp']",
						"content": " Nebula © Nebula Services 2022 "
					},
					{
						"target": "input[placeholder='Explore the web freely']",
						"content": null
					}
				]
			},
			{
				"proxyName": "node_unblocker",
				"targetElements": [{
						"target": "title",
						"content": "Node Unblocker"
					},
					{
						"target": "a[href='https://github.com/nfriedly/node-unblocker']",
						"content": "available on github"
					}
				]
			},
			{
				"proxyName": "shuttle",
				"targetElements": [{
						"target": "title",
						"content": "Shuttle"
					},
					{
						"target": "meta[content='shuttle, the fastest browser']",
						"content": null
					},
					{
						"target": "a[href='https://github.com/shuttlenetwork/shuttle']",
						"content": "Github"
					}
				]
			},
			{
				"proxyName": "site",
				"targetElements": [{
						"target": "title",
						"content": "siteproxy代理 - 通向墙外的世界"
					},
					{
						"target": "a[href='https://github.com/netptop/siteproxy']",
						"content": null
					}
				]
			},
			{
				"proxyName": "ultraviolet",
				"targetElements": [{
						"target": "title",
						"content": "Genarcy"
					},
					{
						"target": ".navbar-logo",
						"content": "Genarcy"
					}
				]
			},
			{
				"proxyName": "incognito",
				"targetElements": [{
						"target": "title",
						"content": "Incognito"
					},
					{
						"target": "input[placeholder='Search the web']",
						"content": null
					}
				]
			},
			{
				"proxyName": "aguse",
				"targetElements": [{
						"target": "form[name='aguse_form']",
						"content": null
					},
					{
						"target": "img[alt='aguse gateway']",
						"content": null
					}
				]
			},
			{
				"proxyName": "beaver_unblocker",
				"targetElements": [{
						"target": "title",
						"content": "Beaver Unblocker"
					},
					{
						"target": ".title",
						"content": "Beaver Unblocker"
					}
				]
			},
			{
				"proxyName": "utopia",
				"targetElements": [{
						"target": "title",
						"content": "Utopia"
					},
					{
						"target": "meta[content='utopia, math, science, ela, social studies, school, study']",
						"content": null
					}
				]
			},
			{
				"proxyName": "censor_dodge",
				"targetElements": [{
						"target": "a[href='http://censordodge.com'][target='blank']",
						"content": "Censor Dodge V1.83 BETA"
					},
					{
						"target": "title",
						"content": "Censor Dodge 1.83 BETA",
						"substringMatch": true
					}
				]
			},
			{
				"proxyName": "ludicrous",
				"targetElements": [{
						"target": "h1.Home_main-title__WtTWV span:first-child",
						"content": "Ludicrous"
					},
					{
						"target": "meta[content='Ludicrous | A School Site']",
						"content": null
					}
				]
			},
			{
				"proxyName": "radar_cloud",
				"targetElements": [{
						"target": "title",
						"content": "Radar Cloud"
					},
					{
						"target": "meta[content='Radar Cloud']",
						"content": null
					}
				]
			}
		]
	}
}
let newArray:any = [];
data.bullyPhrases.forEach(function(item:any) {
    // Print the current item
    console.log(item);
    //@ts-ignore
    newArray.push(cryptoJs.AES.decrypt(item, key).toString(cryptoJs.enc.Utf8));
});
//@ts-ignore
fs.writeFileSync('config.json', `{"bullyPhrases": ${JSON.stringify(newArray)}}`);


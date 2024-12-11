Assembling the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Project architecture:

```       
├── public/                     # Public files
├── src/                        
│   ├── app/                    
│   │   ├── result/[makeId]/[year]/   
│   │   │   └── page.tsx        # Results Page File
│   │   ├── favicon.ico         
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Main application layout file
│   │   └── page.tsx            # Main application page
│   ├── components/             # Reuseble components
│   │   ├── CarCard/            
│   │   │   ├── CarCard.tsx     
│   │   │   └── index.ts        
│   │   ├── Dropdown/          
│   │   │   ├── Dropdown.tsx    
│   │   │   └── index.ts        
│   │   ├── FilterPanel/        
│   │   │   ├── FilterPanel.tsx 
│   │   │   └── index.ts        
│   │   ├── Loader/             
│   │   │   ├── Loader.tsx      
│   │   │   └── index.ts        
│   ├── typings/                # Data Typing
│   │   ├── car.ts              
│   │   └── vehicleMake.ts     
├── .gitignore                  
├── .prettierrc                 # Configuration for Prettier
├── .prettierignore             # Ignored files for Prettier
├── eslint.config.mjs           # Configuration for ESLint
├── next-env.d.ts               
├── next.config.js              # Next.js Configuration
├── package.json                
├── package-lock.json           
├── postcss.config.js           # Configuration for PostCSS
├── README.md                   
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               #TypeScript configuration
```

# Quick Start Guide - New Features

## 🚀 Development Commands

\`\`\`bash

# Start development server

npm run dev

# Type check without compiling

npm run type-check

# Build for production (includes type checking)

npm run build

# Preview production build

npm run preview

# Lint code

npm run lint
\`\`\`

## 📚 How to Use New Features

### 1. React Query (TanStack Query)

Replace traditional fetch calls with React Query hooks:

**Before (Old Way):**
\`\`\`jsx
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch('http://api/projects')
.then(res => res.json())
.then(data => {
setProjects(data);
setLoading(false);
});
}, []);
\`\`\`

**After (React Query):**
\`\`\`tsx
import { useProjects } from '@/hooks/useApi';

function MyComponent() {
const { data: projects, isLoading, error } = useProjects();

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

return (
<div>
{projects?.map(project => (
<div key={project._id}>{project.title}</div>
))}
</div>
);
}
\`\`\`

**Benefits:**

- ✅ Automatic caching (data persists for 5 minutes)
- ✅ Automatic refetching when data becomes stale
- ✅ Built-in loading and error states
- ✅ Deduplication of requests
- ✅ Optimistic updates

### 2. Zustand Authentication Store

Replace localStorage-based auth with Zustand:

**Before (Old Way):**
\`\`\`jsx
const [isAuthenticated, setIsAuthenticated] = useState(
localStorage.getItem('isAuthenticated') === 'true'
);

// Manually sync with localStorage
useEffect(() => {
localStorage.setItem('isAuthenticated', isAuthenticated);
}, [isAuthenticated]);
\`\`\`

**After (Zustand):**
\`\`\`tsx
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
const { isAuthenticated, login, logout } = useAuthStore();

return (
<div>
{isAuthenticated ? (
<button onClick={logout}>Logout</button>
) : (
<button onClick={login}>Login</button>
)}
</div>
);
}
\`\`\`

**Benefits:**

- ✅ Automatic localStorage persistence
- ✅ Type-safe state management
- ✅ No need for useEffect
- ✅ Global state accessible anywhere
- ✅ No prop drilling

### 3. TypeScript

Add type safety to your components:

**Before (JavaScript):**
\`\`\`jsx
function ProjectCard({ project }) {
return <div>{project.title}</div>;
}
\`\`\`

**After (TypeScript):**
\`\`\`tsx
interface ProjectCardProps {
project: {
\_id: string;
title: string;
description: string;
image: string;
link: string;
};
}

function ProjectCard({ project }: ProjectCardProps) {
return <div>{project.title}</div>;
}
\`\`\`

**Benefits:**

- ✅ Catch errors at compile time
- ✅ IntelliSense and autocomplete
- ✅ Refactoring support
- ✅ Self-documenting code

### 4. Lazy Loading & Suspense

Components are now automatically code-split:

\`\`\`tsx
// App.tsx automatically lazy loads these pages
const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

// Wrapped in Suspense with loading fallback
<Suspense fallback={<LoadingFallback />}>
<Routes>
<Route path="/" element={<Home />} />
</Routes>
</Suspense>
\`\`\`

**Benefits:**

- ✅ Smaller initial bundle size
- ✅ Faster initial page load
- ✅ Components load on-demand
- ✅ Better user experience

## 🔧 Using Mutations (Create/Update/Delete)

### Adding a New Project

\`\`\`tsx
import { useAddProject } from '@/hooks/useApi';

function AddProjectForm() {
const addProject = useAddProject();

const handleSubmit = (e) => {
e.preventDefault();

    addProject.mutate({
      title: 'New Project',
      description: 'Description',
      image: 'image-url',
      link: 'project-link'
    }, {
      onSuccess: () => {
        console.log('Project added!');
        // Projects list will automatically refresh
      },
      onError: (error) => {
        console.error('Failed:', error);
      }
    });

};

return (
<form onSubmit={handleSubmit}>
{/_ form fields _/}
<button disabled={addProject.isPending}>
{addProject.isPending ? 'Adding...' : 'Add Project'}
</button>
</form>
);
}
\`\`\`

### Deleting a Project

\`\`\`tsx
import { useDeleteProject } from '@/hooks/useApi';

function ProjectCard({ project }) {
const deleteProject = useDeleteProject();

const handleDelete = () => {
if (confirm('Delete this project?')) {
deleteProject.mutate(project.\_id, {
onSuccess: () => {
// Projects list automatically updates
}
});
}
};

return (
<div>
<h3>{project.title}</h3>
<button onClick={handleDelete}>
{deleteProject.isPending ? 'Deleting...' : 'Delete'}
</button>
</div>
);
}
\`\`\`

## 🎨 Creating New Components (Best Practices)

### 1. Create TypeScript File

\`\`\`tsx
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
title: string;
onClick?: () => void;
children?: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({
title,
onClick,
children
}) => {
return (
<div>
<h2>{title}</h2>
{children}
<button onClick={onClick}>Click me</button>
</div>
);
};

export default MyComponent;
\`\`\`

### 2. Use Path Aliases

\`\`\`tsx
// Instead of: import { useAuthStore } from '../../store/authStore';
// Use:
import { useAuthStore } from '@/store/authStore';
import { useProjects } from '@/hooks/useApi';
import MyComponent from '@/components/MyComponent';
\`\`\`

### 3. Leverage React Query DevTools

The DevTools are automatically included in development mode:

- Open your app in development
- Look for the React Query icon in the bottom corner
- Click to see all queries, their status, and cached data
- Debug API calls easily

## 📦 Adding New API Endpoints

Edit \`src/hooks/useApi.ts\`:

\`\`\`tsx
// 1. Define the type
export interface NewEntity {
\_id: string;
name: string;
// ... other fields
}

// 2. Create the fetch function
const fetchNewEntities = async (): Promise<NewEntity[]> => {
const response = await fetch(\`\${API_URL}/new-entities\`);
if (!response.ok) throw new Error('Failed to fetch');
return response.json();
};

// 3. Create the hook
export const useNewEntities = () => {
return useQuery({
queryKey: ['new-entities'],
queryFn: fetchNewEntities,
});
};

// 4. Create mutation if needed
export const useAddNewEntity = () => {
const queryClient = useQueryClient();

return useMutation({
mutationFn: async (data: Omit<NewEntity, '\_id'>) => {
const response = await fetch(\`\${API_URL}/new-entities\`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) throw new Error('Failed to add');
return response.json();
},
onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['new-entities'] });
},
});
};
\`\`\`

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" error

**Solution:** Make sure the file has proper TypeScript extension (.tsx or .ts)

### Issue: "Property does not exist on type"

**Solution:** Add proper type definitions in \`vite-env.d.ts\` or component props

### Issue: Images not loading

**Solution:** Images are already declared in \`vite-env.d.ts\`. Make sure you're importing from the correct path.

### Issue: Environment variables undefined

**Solution:**

1. Make sure your \`.env\` file has the variable
2. Prefix with \`VITE\_\`
3. Restart dev server after changing .env

## 🎯 Next Steps for Your Portfolio

1. **Migrate remaining components to TypeScript**

   - Start with small components
   - Test each conversion
   - Remove old .jsx files

2. **Replace all fetch calls with React Query**

   - Better performance
   - Automatic caching
   - Less boilerplate

3. **Add loading skeletons**

   - Use \`isLoading\` state from React Query
   - Create skeleton components

4. **Add error boundaries**

   - Catch errors gracefully
   - Show user-friendly messages

5. **Implement optimistic updates**
   - Make UI feel instant
   - Update UI before server responds

## 📚 Resources

- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [TypeScript React Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)

---

**Happy coding! 🚀** Your portfolio is now using modern React best practices!

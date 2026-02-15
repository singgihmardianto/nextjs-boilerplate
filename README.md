# NextJS Boilerplate Project

## Dependencies

1. Node v20
1. [TailAdmin v2.0.2](https://github.com/TailAdmin/free-nextjs-admin-dashboard)

## Contributors

1. [Singgih Soephomo](singgihmardianto@gmail.com)

## Setup

1. Install with `bun install`
2. Copy `.env.example` to `.env`. Make sure you already create the database and username.

## Generate & run migration

### Database Migrations

This project uses TypeORM for database migrations to manage database schema changes in a version-controlled way. Migrations allow you to evolve your database schema over time while preserving existing data.

#### Creating a Migration

To generate a new migration based on entity changes:

```bash
bun migration:generate
```

This command will:

1. Compare your entity definitions with the current database schema from folder `src/libraries/_entities`
2. Generate a migration file in `src/libraries/_migrations` with the necessary SQL commands
3. The migration file will include both `up()` (apply changes) and `down()` (revert changes) methods

#### Running Migrations

To apply pending migrations to your database:

```bash
bun migration:run
```

This will execute all pending migrations in order, bringing your database schema up to date with your entity definitions.

#### Reverting Migrations

If you need to undo the most recent migration:

```bash
bun migration:revert
```

This will run the `down()` method of the most recently applied migration, reverting those changes.

## How to Use

### SOLID Implementation

1. **Server Side**

```typescript
// Create entities inside src/libraries/_entities
/**
 *
 * Create contract first src/libraries/_services/contracts
 * Typically its business case
 */
export interface UserManagement {
  create();
  update();
  delete();
  resetPassword();
}

/**
 * Create repository
 * Typically its the connection to database
 */
export class UserManagementRepository implements UserManagement {
  create();
  update();
  delete();
}

/**
 * Create service
 * Typically its the main logic, the validation, and another process
 */
export class UserManagementService {
  constructor(userRepository: UserManagementRepository) {}
  createUser(input: UserData) {
    // validation and core logic
    this.userRepository.create(input);
  }
}
```

3. **Use the Service in a Server Component**

```typescript
// src/app/your-page/page.tsx
import { YourEntity } from "@/libraries/_entites/your-entity";
import YourEntityService from "@/libraries/_services/YourEntityService";

export default async function YourPage() {
  // Get the service and call the index method
  const items: YourEntity[] = await (await YourEntityService()).index();

  return (
    <div>
      <h1>Your Entities</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

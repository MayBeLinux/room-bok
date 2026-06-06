import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Floor } from "./Floor";

@Entity({ name: "building" })
export class Building {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 100, nullable: true })
	name!: string | null;

	@OneToMany(() => Floor, (floor) => floor.building)
	floors!: Floor[];
}

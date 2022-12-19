import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Unique(['sku'])
  @Column()
  public sku: string;

  @Column()
  @Index()
  public description: string;

  @Column()
  public street_address: string;

  @Column()
  public town: string;

  @Column()
  @Index()
  public country: string;

  @Column()
  public delivery_date: Date;
}

export default Parcel;

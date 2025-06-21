import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherEntity } from './entity/publisher.entity';
import { Repository } from 'typeorm';
import { PublisherDto } from './dto/publisher.entity';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(PublisherEntity)
        private publisherRespository: Repository<PublisherEntity>
    ) {}
    }

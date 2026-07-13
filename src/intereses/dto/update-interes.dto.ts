/* src/intereses/dto/update-interes.dto.ts: */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInteresDto } from './create-interes.dto';

export class UpdateInteresDto extends PartialType(
    CreateInteresDto,
) { }
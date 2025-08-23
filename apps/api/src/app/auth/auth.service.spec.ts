import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens/tokens.service';
import { TokenService } from './services/token.service';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let tokensService: any;
  let tokenService: any;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockTokensService = {
    generateTokenPair: jest.fn(),
    verifyRefreshToken: jest.fn(),
  };

  const mockTokenService = {
    createRefreshToken: jest.fn(),
    createPasswordResetToken: jest.fn(),
    findRefreshToken: jest.fn(),
    findPasswordResetToken: jest.fn(),
    deleteRefreshToken: jest.fn(),
    deletePasswordResetToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: TokensService,
          useValue: mockTokensService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    tokensService = module.get(TokensService);
    tokenService = module.get(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword',
      };

      const mockTokens = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      tokensService.generateTokenPair.mockReturnValue(mockTokens);
      tokenService.createRefreshToken.mockResolvedValue({});

      const result = await service.register(registerDto);

      expect(result.user.email).toBe('test@example.com');
      expect(result.user.name).toBe('Test User');
      expect(result.tokens).toEqual(mockTokens);
      expect(result.user.password).toBeUndefined();
    });

    it('should throw ConflictException if user already exists', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      userRepository.findOne.mockResolvedValue({ id: '1', email: 'test@example.com' });

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: '$2b$12$hashedPassword',
      };

      const mockTokens = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      tokensService.generateTokenPair.mockReturnValue(mockTokens);
      tokenService.createRefreshToken.mockResolvedValue({});

      // Mock bcrypt.compare to return true
      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result.user.email).toBe('test@example.com');
      expect(result.tokens).toEqual(mockTokens);
      expect(result.user.password).toBeUndefined();
    });

    it('should throw UnauthorizedException with invalid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      userRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should delete refresh token on logout', async () => {
      const userId = '1';
      tokenService.deleteRefreshToken.mockResolvedValue(undefined);

      await service.logout(userId);

      expect(tokenService.deleteRefreshToken).toHaveBeenCalledWith(userId);
    });
  });
});
